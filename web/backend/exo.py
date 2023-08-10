import os, json

from flask import Flask
from flask_restx import Api, Resource
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from asgiref.wsgi import WsgiToAsgi


# db = SQLAlchemy()

app = Flask(__name__)

app.config["SECRET_KEY"] = 'MY_SECRET_KEY_123'
# app.config['SQLALCHEMY_DATABASE_URI'] = '68'
# db.init_app(app)
api = Api(app)



# Setup database
# @app.before_request
# def initialize_database():
#     try:
#         db.create_all()
#     except Exception as e:

#         print('> Error: DBMS Exception: ' + str(e) )

#         # fallback to SQLite
#         BASE_DIR = os.path.abspath(os.path.dirname(__file__))
#         app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'db.sqlite3')

#         print('> Fallback to SQLite ')
#         db.create_all()


@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

if __name__ == '__main__':
    app.run(debug=True)