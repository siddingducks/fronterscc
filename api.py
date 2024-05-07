from flask import *
from flask_restful import Resource
from backend.dbconn import connect
import mimetypes
mimetypes.add_type('application/javascript', '.mjs')

app = Flask(__name__)
connect()

#FRONTERS.CC -- LANDING AND SETUP PAGES 
class Pages():
    @app.route('/')
    def home():
        return render_template('index.html')
    
    @app.route('/sp')
    def sp_setup():
        return render_template('sp-setup.html')
    
    @app.route('/pk')
    def pk_setup():
        return render_template('pk-setup.html')

#FRONTERS.CC/PK
class PluralKit(Resource):
    def __init__(self, sys_id):
        self.sys_ID = sys_id

    @app.route('/pk/<sys_id>')
    def pk_fronters(sys_id):
        return render_template('pk-index.html')

    @app.route('/api/pk/<sys_id>', methods=['GET'])
    def get_user_by_id(sys_id):
        return jsonify(sys_id)

#FRONTERS.CC/SP
class SimplyPlural():
    def __init__(self, custom_url):
        self.custom_url = custom_url

    @app.route('/sp/<custom_url>')
    def sp_fronters(custom_url):
        return render_template('sp-index.html')

class User:
    #creating a user object to use as a reference
    def __init__(self, user_id, token, custom_url):
        self.user_id = user_id
        self.token = token
        self.custom_url = custom_url

    def __str__(self):
        return f'user_id: {self.user_id}' \
        f'user_id: {self.token}' \
        f'user_id: {self.custom_url}'

class UserList(Resource):
    def __init__(self, user_id, token, custom_url):
        self.user_id = user_id
        self.token = token
        self.custom_url = custom_url

    #get list of all users
    @app.route('/api/sp/userlist', methods=['GET'])
    def get_users():
        crsr = connect.cursor()
        #
        crsr.execute('SELECT * from users;')
        data = crsr.fetchall()
        #
        crsr.close()
        connect.close()
        return jsonify(data) #FOR ADMIN USE
    
    #add a new user to the database
    @app.route('/api/sp/users', methods=['GET', 'POST'])
    def add_new_user():
        data = request.get_json()
        user_id = data['user_id']
        token = data['token']
        custom_url = data['custom_url']

        db = connect()
        crsr = db.cursor()
        #
        user = User(user_id, token, custom_url)
        crsr.execute(f"INSERT INTO users (user_id, token, custom_url) VALUES ('{user.user_id}', '{user.token}', '{user.custom_url}');")
        db.commit()
        #
        crsr.close()
        db.close()
        return json.dumps("Data added.")

class UserActions(Resource):
    def __init__(self, user_id, token, custom_url):
        self.user_id = user_id
        self.token = token
        self.custom_url = custom_url

    @app.route('/validateuser', methods=['POST'])
    def validate_user():
        data = request.get_json()
        user_id = data["user_id"]
        preexisting_user = False

        conn = connect()
        crsr = conn.cursor()
        #
        crsr.execute(f"SELECT user_id from users WHERE user_id = '{user_id}';")
        check = crsr.fetchone()
        #
        crsr.close()
        conn.close()
        if check != None:
            if check[0] == data['user_id']:
                preexisting_user = True
        preexisting_user = jsonify(preexisting_user)
        return preexisting_user
    
    @app.route('/custom_url', methods=['POST'])
    def validate_custom_url():
        data = request.get_json()
        custom_url = data['custom_url']
        conn = connect()
        crsr = conn.cursor()
        #
        crsr.execute(f"SELECT user_id from users WHERE custom_url = '{custom_url}';")
        check = crsr.fetchone()
        #
        crsr.close()
        conn.close()

        if check == data['user_id']:
            #custom_url is taken by the user being validated
            available_url = True
        elif check == None:
            #custom_url is not in the databse
            available_url = True
        else:
            #custom_url is in the databse but assigned to another user
            available_url = False
        available_url = jsonify(available_url)
        return available_url


    #GET one user by custom_url
    @app.route('/api/sp/<custom_url>', methods=['GET'])
    def get_user_by_url(custom_url):
        conn = connect()
        crsr = conn.cursor()
        #
        crsr.execute(f"SELECT user_id from users WHERE custom_url = '{custom_url}';")
        user_id = crsr.fetchone()

        crsr.execute(f"SELECT token from users WHERE custom_url = '{custom_url}';")
        token = crsr.fetchone()
        #
        crsr.close()
        conn.close()

        response = [user_id, token]
        response = Response(
            response=json.dumps(response),
            status=200,
            mimetype='application/json'
        )
        return response
    
    #PUT user info by user_id and token
    @app.route('/api/sp/update/<user_id>', methods=['PUT'])
    def update_url(user_id):
        data = request.get_json()
        db = connect()
        crsr = db.cursor()
        #
        user = User(user_id,
                    data['token'],
                    data['custom_url'])
        crsr.execute(f"UPDATE users SET custom_url = '{user.custom_url}' WHERE user_id = '{user.user_id}' AND token = '{user.token}';")
        db.commit()
        #
        crsr.close()
        db.close()
        return json.dumps("Record was successfully updated.")
    
    #DELETE information for one user by user_id and token
    @app.route('/api/sp/delete/<user_id>', methods=['DELETE'])
    def delete(user_id):
        data = request.get_json()
        token = data['token']

        db = connect()
        crsr = db.cursor()
        #
        crsr.execute(f"DELETE FROM users WHERE user_id = '{user_id}' AND token = '{token}';")
        db.commit()
        #
        crsr.close()
        db.close()
        return json.dumps("Data deleted.")


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)