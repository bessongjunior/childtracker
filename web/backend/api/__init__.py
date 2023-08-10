
import os, json

from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
# from flask_redoc import Redoc
from asgiref.wsgi import WsgiToAsgi


from .routes.routes import rest_api
from .model.models import db

app = Flask(__name__)

app.config.from_object('api.config.BaseConfig')
# app.config['UPLOAD_EXTENSIONS'] = ['.jpg', '.png', '.gif']
# app.config['REDOC'] = {'spec_route': '/redocs', 'title': 'My Docs'}

db.init_app(app)
rest_api.init_app(app)
CORS(app)
JWTManager(app)
# redoc = Redoc(app) # , spec_url='/swagger.json'
migrate = Migrate(app, db)

# Setup database
@app.before_request
def initialize_database():
    try:
        db.create_all()
    except Exception as e:

        print('> Error: DBMS Exception: ' + str(e) )

        # fallback to SQLite
        BASE_DIR = os.path.abspath(os.path.dirname(__file__))
        app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'db.sqlite3')

        print('> Fallback to SQLite ')
        db.create_all()

"""
   Custom responses
"""

@app.after_request
def after_request(response):
    """
       Sends back a custom error with {"success", "msg"} format
    """

    if int(response.status_code) >= 400:
        response_data = json.loads(response.get_data())
        if "errors" in response_data:
            response_data = {"success": False,
                             "msg": list(response_data["errors"].items())[0][1]}
            response.set_data(json.dumps(response_data))
        response.headers.add('Content-Type', 'application/json')
    return response

asgi_app = WsgiToAsgi(app)