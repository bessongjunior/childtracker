
from datetime import datetime, timezone, timedelta
import logging, os, imghdr
from functools import wraps
from http import HTTPStatus

from flask import request, url_for, current_app, abort
from flask_restx import Namespace, Resource, fields, reqparse
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename
import httpx

import jwt

from ...model.models import db, Users, JWTTokenBlocklist, Devices
from ...config import BaseConfig
# import requests

user_ns = Namespace('user', description='Users related operations')

# configure a file handler for admin namespace only
user_ns.logger.setLevel(logging.INFO)
fh = logging.FileHandler("v1.log")
user_ns.logger.addHandler(fh)

# Flask-Restx schema models for api request and response data
parser = reqparse.RequestParser()

upload_parser = user_ns.parser()

upload_parser.add_argument('profile_picture', 
                           location='files', 
                           type = FileStorage, 
                           required=True, 
                        #    action='append'
                        )

signup_model = user_ns.model('UserSignUpModel', {
                                            "firstname": fields.String(required=True, min_length=2, max_length=32),
                                            "lastname": fields.String(required=True, min_length=2, max_length=32),
                                            "username": fields.String(required=True, min_length=2, max_length=32),
                                            "email": fields.String(required=True, min_length=4, max_length=64),
                                            "password": fields.String(required=True, min_length=6, max_length=16),
                                            "dob": fields.Date(required=True),
                                            "sex": fields.String(required=True, min_length=4, max_length=6),
                                            "contact": fields.Integer(required=True, min_length=9, max_length=13),
                                            "province": fields.String(required=True, min_length=3, max_length=32),
                                            "country": fields.String(required=True, min_length=3, max_length=32)
                                        })

login_model = user_ns.model('UserLoginModel', {
                                        "email": fields.String(required=True, min_length=4, max_length=64),
                                        "password": fields.String(required=True, min_length=4, max_length=16)
                                        })

user_edit_model = user_ns.model('UserUserEditModel', {"userID": fields.String(required=True, min_length=1, max_length=32),
                                                   "username": fields.String(required=True, min_length=2, max_length=32),
                                                   "email": fields.String(required=True, min_length=4, max_length=64)
                                                   })

alluser_model = user_ns.model('AllUsers', {
    "id": fields.Integer(),
    "username": fields.String(),
    "email": fields.String(),
    "firstname": fields.String(),
    "lastname": fields.String(),
    'profile_photo': fields.String(),
    'date_joined': fields.String(),
    'sex': fields.String(),
    'country': fields.String()
})

tracker_model = user_ns.model('TrackerModel', {
                                        "serial_number" : fields.String(),
                                        "name": fields.String()
                                    })

# Helper function for JWT token required

def token_required(f):

    @wraps(f)
    def decorator(*args, **kwargs):

        token = None

        if "authorization" in request.headers:
            token = request.headers["authorization"]

        if not token:
            return {"success": False, "msg": "Valid JWT token is missing"}, 400

        try:
            data = jwt.decode(token, BaseConfig.SECRET_KEY, algorithms=["HS256"])
            current_user = Users.get_by_email(data["email"])

            if not current_user:
                return {"success": False,
                        "msg": "Sorry. Wrong auth token. This user does not exist."}, 400

            token_expired = db.session.query(JWTTokenBlocklist.id).filter_by(jwt_token=token).scalar()

            if token_expired is not None:
                return {"success": False, "msg": "Token revoked."}, 400

            if not current_user.check_jwt_auth_active():
                return {"success": False, "msg": "Token expired."}, 400

        except:
            return {"success": False, "msg": "Token is invalid"}, 400

        return f(current_user, *args, **kwargs)

    return decorator

allowed_extensions = set(['jpg', 'png', 'jpeg', 'gif'])

def allowed_file(filename):
    '''check if the file name has our valide extension'''
    for filetype in allowed_extensions:
        return filetype
    # return filetype in allowed_extensions

def validate_image(stream):
    header = stream.read(512)
    stream.seek(0) 
    format = imghdr.what(None, header)
    if not format:
        return None
    return '.' + (format if format != 'jpeg' else 'jpg')

# Flask-Restx routes



@user_ns.route('/v1/users/register')
class Register(Resource):
    """
       Creates a new user by taking 'signup_model' input
    """

    @user_ns.expect(signup_model, validate=True)
    def post(self):

        req_data = request.get_json()

        _username = req_data.get("username")
        _firstname = req_data.get("firstname")
        _lastname = req_data.get("lastname")
        _email = req_data.get("email")
        _password = req_data.get("password")
        _Province = req_data.get("province")
        _dob = datetime.strptime(req_data.get("dob"), '%Y-%m-%d') 
        _sex = req_data.get("sex")
        _phone_number = req_data.get("contact")
        _country = req_data.get("country")

        user_exists = Users.get_by_email(_email)
        if user_exists:
            # add log
            return {"success": False,
                    "msg": "Email already taken"}, HTTPStatus.BAD_REQUEST

        new_user = Users(
            username=_username, 
            firstname=_firstname,
            lastname=_lastname,
            email=_email,
            dob=_dob,
            phone_number=_phone_number,
            sex=_sex,
            province=_Province,
            country=_country
            )

        new_user.set_password(_password)
        new_user.save()

        return {"success": True,
                "userID": new_user.id,
                "msg": "The user was successfully registered"}, HTTPStatus.CREATED


@user_ns.route('/v1/users/login')
class Login(Resource):
    """
       Login user by taking 'login_model' input and return JWT token
    """

    @user_ns.expect(login_model, validate=True)
    def post(self):

        req_data = request.get_json()

        _email = req_data.get("email")
        _password = req_data.get("password")

        user_exists = Users.get_by_email(_email)

        if not user_exists:
            return {"success": False,
                    "msg": "This email does not exist."}, HTTPStatus.BAD_REQUEST

        if not user_exists.check_password(_password):
            return {"success": False,
                    "msg": "Wrong credentials."}, HTTPStatus.BAD_REQUEST

        # create access token uwing JWT
        token = jwt.encode({'email': _email, 'exp': datetime.utcnow() + timedelta(minutes=30)}, BaseConfig.SECRET_KEY)

        user_exists.set_jwt_auth_active(True)
        user_exists.save()

        image_url = url_for('static', filename=f'profile/{user_exists.profile_photo}', _external=True)

        return {"success": True,
                "token": token,
                "user": user_exists.toJSON(),
                "image_url": image_url
                }, HTTPStatus.CREATED


@user_ns.route('/v1/users/edit')
class EditUser(Resource):
    """
       Edits User's username or password or both using 'user_edit_model' input
    """

    @user_ns.expect(user_edit_model)
    @token_required
    def patch(self, current_user):

        req_data = request.get_json()

        _new_username = req_data.get("username")
        _new_email = req_data.get("email")

        if _new_username:
            self.update_username(_new_username)

        if _new_email:
            self.update_email(_new_email)

        self.save()

        return {"success": True}, HTTPStatus.ACCEPTED
    

    @user_ns.expect(upload_parser)
    @token_required
    def put(self, current_user): #
        '''Upload profile picture'''

        args = upload_parser.parse_args()
        file = args['profile_picture']

        user_updates = Users.query.filter_by(id=int(current_user)).first() #current_user._id # replace with the technique bove
        
        if file is None:
                # add logs
                return {"success": False, "msg": "Field not found, please resend!"}, HTTPStatus.NO_CONTENT #401
        
        if user_updates is None:
                # add logs
                return{"success": False, "msg":"The param 'id' mismatch"}, HTTPStatus.BAD_REQUEST #401
        
        
        if not allowed_file(file.filename):
                # add logs 
                return {'success': False, 'msg': 'file type not accepted'}, HTTPStatus.FORBIDDEN
        path = os.path.join(current_app.config['UPLOAD_PICTURE'], str(current_user._id))
        # path = os.path.join(current_app.config['UPLOAD_PICTURE'], "1")
        if not os.path.exists(path):
            os.makedirs(path)
        filename = secure_filename(file.filename)
        file_ext = os.path.splitext(filename)[1]
        if allowed_file(file.filename) or file_ext != validate_image(file.stream):
                # filename = secure_filename(file.filename)
                # print(filename)
                # double checking the file type.
                # if filename != '':
                    # file_ext = os.path.splitext(filename)[1]
            if file_ext not in current_app.config['UPLOAD_EXTENSIONS'] or file_ext != validate_image(file.stream):
                abort(400)
                # add logs
                # return{}, 400
            file.save(os.path.join(path, filename))

        user_updates.profile_photo = filename
        db.session.commit()

        return {"success": True,
                "msg": "Image uploaded with success" }, HTTPStatus.ACCEPTED   


@user_ns.route('/v1/users/logout')
class LogoutUser(Resource):
    """
       Logs out User using 'logout_model' input
    """

    @token_required
    def post(self, current_user):

        _jwt_token = request.headers["authorization"]

        jwt_block = JWTTokenBlocklist(jwt_token=_jwt_token, created_at=datetime.now(timezone.utc))
        jwt_block.save()

        self.set_jwt_auth_active(False)
        self.save()

        return {"success": True}, HTTPStatus.OK


@user_ns.route('/v1/devices/track')
class TrackableDevices(Resource):
    ''' Resource endpoint to track user devices'''

    @token_required
    def get(self, current_user): 
        ''' Get all user devices/ trackable devices for each user'''

        # pass
        users = Users.get_by_id(current_user.id)
        res = [
            {
                'id': users.id, 
                'name': users.username, 
                'devices': [
                    { 
                        'id': device.id, 
                        'sn': device.serial_number, 
                        'name': device.name,
                        'task': device.task
                    } for device in users.user_devices
                ]
            } #for user in users
        ]

        return {"data": res}, HTTPStatus.OK

    @user_ns.expect(tracker_model)
    @token_required
    def post(self, current_user): 
        ''' track a particular device / all devices'''

        # pass
        # taking the user device info to track
        req_data = request.get_json()
        _serial_number = req_data.get("serial_number")
        _name = req_data.get("name")

            # check sn and name exist
        # query to get all devices under the user and confirm device exist
        # query_check = Users.query.filter_by(current_user)
        # query_check = Users.query.join(Devices, (Users.id == Devices.user_id)).all()

        serial_check = Devices.get_by_serial(_serial_number) and Devices.get_by_name(_name) 

        if serial_check is None:
            # add logs
            return {"success": False, "msg": "Input information invalid"}, HTTPStatus.UNPROCESSABLE_ENTITY

        # print(query_check)
        # return {"data":query_check}, 200
        # client = httpx.Client()
        # while True:
        #     response = client.get('https://example.com')
            # data = response.json()
        fetch_url = "https://jsonplaceholder.typicode.com/todos"
        with httpx.Client() as client:
            response = client.get(fetch_url)
            data = response.json()
            print(data)
        
        return {"success": True, 'res': data}, 200



# for admin use!!! below

@user_ns.route('/v1/allusers')
class AllUsers(Resource):
    '''Resource endpoint to get user informations'''

    @user_ns.marshal_with(alluser_model)
    def get(self):
        '''get all users in db, without pagination'''

        users = Users.query.all()
        result = []
        # image_url = url_for('static', filename=f'profile/{users.profile_photo}', _external=True)

        for user in users:
            result.append({
                'id': user.id,
                'username': user.username,
                'profile_photo': f"{url_for('static', filename=f'profile/{user.id}/{user.profile_photo}', _external=True)}",  #image_url, #user.profile_photo,
                'email': user.email,
                'firstname':user.firstname,
                'lastname': user.lastname,
                'date_joined': user.date_joined,
                'sex': user.sex,
                'country': user.country
            })

        return result, HTTPStatus.OK


@user_ns.route('/test')
class Test123(Resource):
    '''Design for testing smthg'''

    # @user_ns.marshal_with(user_devices_all_model) # add schema
    def get(self):
        '''testx purposes'''

        users = Users.query.all()

        # result = []

        # for user in users:
        #     devices = []
        #     for device in users.devices:
        #         devices.append({'id': device.id, 'sn': device.serial_number, 'name': device.name})
        #     result.append({'id': user.id, 'title': user.title, 'devices': devices})
        # return result
    
        res = [
            {
                'id': user.id, 
                # 'sn': device.serial_number, 
                'name': user.username, 
                'image_url': "fix image url",
                'devices': [
                    { 
                        'id': device.id, 
                        'sn': device.serial_number, 
                        'name': device.name,
                        'task': device.task
                    } for device in user.user_devices
                ]
            } for user in users
        ]

        return {"data": res}, HTTPStatus.OK
    

    
    

        # ✅ Your project is ready!   
        # To run your project, navigate to the directory and run one of the following npm commands.   
        # - cd trackerapp                         
        # - npm run android                     
        # - npm run ios # you need to use macOS to build the iOS project - use the Expo app if you need to do iOS development without a Mac                                                                                    
        # - npm run web  
        





