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
    
    @app.route('/sp_setup')
    def sp_setup():
        return render_template('sp-user.html')
    
    @app.route('/pk_setup')
    def pk_setup():
        return render_template('pk-user.html')

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
    @app.route('/api/sp/users', methods=['GET'])
    def get_users():
        crsr = connect.cursor()
        #
        crsr.execute('SELECT * from users;')
        data = crsr.fetchall()
        #
        crsr.close()
        connect.close()
        
        return jsonify(data) #FOR DEVELOPMENT
    
    #add a new user to the database
    @app.route('/api/sp/users', methods=['POST'])
    def add_new_user():
        db = connect()
        crsr = db.cursor()
        #
        user = User(request.form['user_id'],
                    request.form['token'],
                    request.form['custom_url'])
        print(user) #FOR DEVELOPMENT
        crsr.execute(f'INSERT INTO users (user_id, token, custom_url) VALUES ({user.user_id}, {user.token}, {user.custom_url});')
        db.commit()
        data = crsr.lastrowid #FOR DEVELOPMENT
        #
        crsr.close()
        db.close()
        return jsonify(data) #FOR DEVELOPMENT

class UserActions(Resource):
    def __init__(self, user_id, token, custom_url):
        self.user_id = user_id
        self.token = token
        self.custom_url = custom_url

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
    def update_url():
        db = connect()
        crsr = db.cursor()
        #
        user = User(request.form['user_id'],
                    request.form['token'],
                    request.form['custom_url'])
        print(user) #FOR DEVELOPMENT
        crsr.execute(f"UPDATE users SET custom_url = '{user.custom_url}' WHERE user_id = '{user.user_id}' , token = '{user.token}';")
        db.commit()
        #
        crsr.close()
        db.close()
        return json.dumps("Record was successfully updated.")
    
    #DELETE information for one user by user_id and token
    @app.route('/api/sp/delete/<user_id>/<token>', methods=['DELETE'])
    def delete(user_id, token):
        db = connect()
        crsr = db.cursor()
        #
        crsr.execute(f"DELETE FROM users WHERE user_id = '{user_id}', token = '{token};'")
        #
        crsr.close()
        db.close()


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5500)