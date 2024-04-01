import psycopg2
from backend.config import config
from flask import Flask
from flask_restful import Resource, Api, reqparse

app = Flask(__name__)
api = Api(app)

if __name__ == "__main__":
    app.run(debug=True)

def connect():
    try:
        params = config()
        print('Connecting to the postgreSQL database...')
        connection = psycopg2.connect(**params)
        return connection
    except(Exception, psycopg2.DatabaseError) as error:
        print(error)

if __name__ == "__main__":
    connect()