

import os
from datetime import datetime, timezone, timedelta
from http import HTTPStatus
from functools import wraps
import logging, jwt

from flask import request, url_for, current_app
from flask_restx import Namespace, Resource, fields, reqparse
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
from sqlalchemy import or_
# from flask_sqlalchemy import or_
from flask_jwt_extended import create_access_token, get_jwt_identity,jwt_required

from ...model.models import db, Admin, Users, Devices, JWTTokenBlocklist
# from from backend.api.models.models import db, Admin
from ...config import BASE_DIR, BaseConfig


admin_ns = Namespace('admin', description='Admin related operations')


# configure a file handler for admin namespace only
admin_ns.logger.setLevel(logging.INFO)
fh = logging.FileHandler("v1.log")
admin_ns.logger.addHandler(fh)

admin_reg_model = admin_ns.model('RegistrationModel', {
    "first_name": fields.String(),
    "last_name": fields.String(),
    "admin_username": fields.String(),
    "email": fields.String(), 
    "password": fields.String(),
})

admin_login_model = admin_ns.model('LoginModel', {
    "email": fields.String(),
    "password": fields.String()
})

admin_edit_model = admin_ns.model('EditModel', {
    "username": fields.String(),
    "email": fields.String()
})

all_devices_model = admin_ns.model('AllDevicesModel', {
     'id': fields.String(),
     'serial number': fields.String(),
     'name': fields.String(),
     'task': fields.String(),
     'owner': fields.String()
})

alluser_model = admin_ns.model('AllUsers', {
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

assign_device_model = admin_ns.model('AssignDeviceModel', {
                                        "devicename": fields.String(),
                                        "serialnumber": fields.String(),
                                        'username': fields.String(),
                                        "email": fields.String()
                                    })


parser = reqparse.RequestParser()
upload_parser = admin_ns.parser()
upload_parser.add_argument('profile_picture', 
                           location='files', 
                           type = FileStorage, 
                           required=True, 
                        #    action='append'
                        )

allowed_extensions = set(['jpg', 'png', 'jpeg', 'gif'])

"""Helper function for JWT token required"""

def allowed_file(filename):
    '''check if the file name has our valide extension'''
    for filetype in allowed_extensions:
        return filetype
    # return filetype in allowed_extensions

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
            current_user = Admin.find_by_email(data["email"])
            print(current_user[id])
            # current_user = current_user_id.id
            print(current_user.email)

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


''' Routes '''

# token not required

@admin_ns.route('/v1/register')
class RegisterAdmin(Resource):
    ''' Registration resource route'''

    @admin_ns.expect(admin_reg_model)
    def post(self, **kwargs):
        '''Admin registration endpoint'''

        req_data = request.get_json()

        _firstname = req_data.get('first_name')
        _lastname = req_data.get('last_name')
        _username = req_data.get('admin_username')
        _email = req_data.get('email')
        _password = req_data.get('password')


        # check if user email exist
        check_email = Admin.find_by_email(_email)
        
        if not check_email is None:
            # add logs
            return {
                "Success": False,
                "msg": "email already exits"
            }, HTTPStatus.BAD_REQUEST
        
        new_admin = Admin(first_name=_firstname, last_name=_lastname, admin_username=_username, email=_email)

        new_admin.set_password(_password)

        new_admin.save()

        return {"success": True,
                "userID": new_admin.id,
                "msg": "The user was successfully registered"
                }, HTTPStatus.CREATED


@admin_ns.route('/v1/login')
class LoginAdmin(Resource):
    ''' Login resource route'''

    @admin_ns.expect(admin_login_model)
    def post(self):
        '''Admin Login endpoint'''

        req_data = request.get_json()

        _email = req_data.get("email")
        _password = req_data.get("password")

        admin_exists = Admin.find_by_email(_email)

        print(admin_exists)

        if not admin_exists:
            admin_ns.logger.info(f"Administrator donot exist, the email '{_email}' was use, attempting to login on an admin account")
            return {"success": False,
                    "msg": "This email does not exist."}, HTTPStatus.BAD_REQUEST

        if not admin_exists.check_password(_password):
            admin_ns.logger.info(f"Administrator exist, the admin with email '{_email}' was use, password did not match")
            return {"success": False,
                    "msg": "Wrong credentials."}, HTTPStatus.UNPROCESSABLE_ENTITY 

        # create access token uwing JWT
        token = jwt.encode({'email': _email, 'exp': datetime.utcnow() + timedelta(minutes=30)}, BaseConfig.SECRET_KEY)

        access_token = create_access_token(identity=_email)

        admin_exists.set_jwt_auth_active(True)
        admin_exists.save()

        image_url = url_for('static', filename=f'profile/admin/{admin_exists.profile}', _external=True)

        return {"success": True,
                "token": access_token,
                "user": admin_exists.toJSON(),
                # "image_url": image_url
                }, HTTPStatus.CREATED


@admin_ns.route('/v1/resetpassword')
class ResetPassword(Resource):
    '''Resource endpoint to reset password'''

    def post(self):
        '''Endpoint to reset password'''

        req_data = request.get_json()

        _email = req_data.get("email")
        _new_password = req_data.get("password")

        # check if email exist in database
        check_mail = Admin.find_by_email(_email)

        if not check_mail:
            # add logs
            return {
                "success": False,
                "msg": f"Sorry Your email: {_email}is not Found."
            }, HTTPStatus.BAD_REQUEST
        
        # Hashing password before saving in database

        check_mail.password = self.set_password(_new_password)

        db.session.commit()

        return {"success": True, "msg": "Password successfully updated. Login Now."}, HTTPStatus.ACCEPTED

# Token required

@admin_ns.route('/v1/logout')
class LogoutAdmin(Resource):
    ''' Logout resource route'''

    # @token_required
    @jwt_required
    def post(self): #, current_user
        '''Admin Logout endpoint'''

        # _JWT_token = request.headers.get('Authorization')
        # _jwt_token = request.headers["authorization"]
        current_user = get_jwt_identity()

        admin_check = Admin.find_by_id(current_user)
        print(admin_check)
        admin_check.set_jwt_auth_active(False)
        admin_check.save()

        return {"success": True, "msg": "successfully logged out!"}, HTTPStatus.OK


@admin_ns.route('/v1/profile-info')
class AdminUserInfo(Resource):
    '''Resource for admin Profil Details'''

    @jwt_required()
    def get(self):
        '''Endpoint which returns admin profile info'''

        current_user = get_jwt_identity()
        admin_info = Admin.query.filter_by(email=current_user).first()

        res = {
                'date_joined': f'{admin_info.date_joined}',
                'email': admin_info.email,
                'name': admin_info.admin_username,
                'image_url':  url_for('static', filename=f'profile/admin/{admin_info.profile}', _external=True),
                'username': f"{admin_info.first_name} {admin_info.last_name}",
                'location': 'Cameroon',
        }

        return res, HTTPStatus.OK


@admin_ns.route('/v1/edit')
class EditAdminDetails(Resource):
    ''' Edit resource route'''

    @admin_ns.expect(admin_edit_model)
    # @token_required
    @jwt_required()
    def patch(self):
        '''Admin Logout endpoint'''

        req_data = request.get_json()
        current_user = get_jwt_identity()

        _new_username = req_data.get("username")
        _new_email = req_data.get("email")
        _contact = req_data.get("contact")

        # print(req_data)
        # print(current_user)


        admin_updates = Admin.query.filter_by(email=current_user).first()

        print(admin_updates)
        admin_updates.admin_username = _new_username
        admin_updates.email = _new_email
        # admin_updates.contact = _contact

        # if _new_username:
        #     self.update_username(_new_username)
        
        # if _new_email:
        #     self.update_email(_new_email)

        db.session.commit()

        return {"success": True, "msg": "username and email successfully updated."}, HTTPStatus.ACCEPTED

    @admin_ns.expect(upload_parser)
    # @token_required
    @jwt_required()
    def put(self, current_user):
        '''Admin profile picture upload endpoint'''

        args = upload_parser.parse_args()
        file = args['profile_picture']

        admin_updates = Admin.query.filter_by(id=int(current_user.id)).first()

        if file is None:
                # add logs
                return {"success": False, "msg": "Field not found, please resend!"}, HTTPStatus.NO_CONTENT
        
        if admin_updates is None:
                # add logs
                return{"success": False, "msg":"The param 'id' mismatch"}, HTTPStatus.BAD_REQUEST
        
        
        if not allowed_file(file.filename):
                # add logs 
                return {'success': False, 'msg': 'file type not accepted'}, HTTPStatus.FORBIDDEN
        
        if allowed_file(file.filename):
                filename = secure_filename(file.filename)
                # print(filename)
                file.save(os.path.join(current_app.config['UPLOAD_PICTURE']+"/admin", filename))


        filename = secure_filename(file.filename)
        admin_updates.profile = filename

        db.session.commit()

        return {
             "success": True,
             "msg": "Profile picture successfully uploads"
        }, HTTPStatus.ACCEPTED   

# @admin_ns.route('/v1/profile/<string:username>/')
# class UserProfile(Resource):
#     '''User profile endpoint'''

#     def get(self, username):
#         '''Get current admin profile'''

#         filename = Admin.query.filter_by(admin_username=username).first()
#         directory = os.path.join(current_app.config['UPLOAD_PICTURE'])
#         # return send_file(filename.profile, mimetype='image/jpeg')
#         # return send_from_directory(directory, filename.profile, as_attachment=False), HTTPStatus.OK
#         image_url = url_for('static', filename=f'profile/{filename.profile}', _external=True)
#         return {'image_url': image_url}, HTTPStatus.OK


@admin_ns.route('/v1/device/registration')
class RegisterUserDevice(Resource):
    ''' Device Registration resource route'''

    @admin_ns.expect(assign_device_model)
    # @token_required
    @jwt_required()
    def post(self): #, current_user
        '''endpoint to register a user device'''

        req_data = request.get_json()
        current_user = get_jwt_identity()
        print(current_user)
        print(req_data)

        _serial_number = req_data.get("serialnumber")
        _name = req_data.get("devicename")
        _email = req_data.get("email")
        _username = req_data.get("username")

        # check userid exist

        check_user = Users.get_by_username(_username)  #.get_by_id(user_id)

        if not check_user:
            # add logs
            return {"success": False, "msg": "user do not exist"}, HTTPStatus.UNAUTHORIZED
        
        # check email

        check_mail = Users.get_by_email(_email)

        if not check_mail:
            # add log
            return {"success": False, "msg": "user email do not exist"}, HTTPStatus.UNAUTHORIZED
       
        # confirm check user & check_mail have the same id

        if check_user.id != check_mail.id:
            # add logs
            return {"Success": False, "msg": "username and email are not of the same user!"}, HTTPStatus.BAD_REQUEST
        
        else:
            user_id = check_user.id
            # pass

        # admin_exist= Admin.find_by_email(current_user)
        # print(admin_exist.id)

        # if admin_exist is not None:
        #     admin_id = admin_exist.id
        # print(current_user.id) str attri has no val id!!

        user_device = Devices(user_id=user_id, 
                              serial_number=_serial_number,
                              name=_name,
                              admin_id=current_user #admin_id #current_user.id
                              )
        # user_device.
        user_device.save()

        return {"success": True, "msg": "Device attributed to user"}, HTTPStatus.CREATED


@admin_ns.route('/v1/alldevices')
class UserDevices(Resource):
    '''Return all devices and username in db'''

    @admin_ns.marshal_with(all_devices_model) # add schema
    @jwt_required()
    def get(self):
        '''Endpoint to give all devices and username'''

        devices  = Devices.query.all()

        resp = [
             {
                'id': device.id,
                'serial number': device.serial_number, 
                'name': device.name,
                'task': device.task,
                'owner': f"{device.users.firstname} {device.users.lastname}"
             } for device in devices
        ]

        return resp, HTTPStatus.OK


@admin_ns.route('/v1/users/<search_term>')
class SearchUser(Resource):
    '''Resource endpoint to Search and return user data'''

    # @token_required
    @jwt_required()
    def get(self, search_term):
        '''endpoint to Search and return user data'''

        # results = Users.query.filter(Users.email.like('%'+search_term+'%')).all()
        
        results = Users.query.filter(or_(Users.phone_number.like('%'+search_term+'%'), Users.email.like('%'+search_term+'%'))).first()
        # print(results)
        if not results:
            return {'success': False, 'msg': f'{search_term} not found, try again!'}, 404
        
        res = {
                'username': results.username,
                'email': results.email,
                'firstname': results.firstname,
                'lastname': results.lastname,
                'phone': results.phone_number,
                'date_joined': f'{results.date_joined}'}
            # } for result in results
        # print(res)

        if results:
            return res, 200
            

@admin_ns.route('/v1/users/allusers')
class AllUsers(Resource):
    '''Resource endpoint to get user informations'''

    @admin_ns.marshal_with(alluser_model)
    @jwt_required()
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



@admin_ns.route('/v1/device/<search_term>')
class SearchDeviceInfo(Resource):
    '''Resource endpoint to get details of a particular device'''

    @jwt_required()
    def get(self, search_term):
        '''endpoint to return a particular device information'''

        results = Devices.query.filter(or_(Devices.name.like('%'+search_term+'%'), Devices.serial_number.like('%'+search_term+'%')))
        if not results:
            return {'success': False, 'msg': f'{search_term} not found, try again!'}, 404
        
        res = {
                'devicename': results.name,
                'serialnumber': results.serial_number,
                'status': results.task,
                'ownername': f"{results.users.firstname} {results.users.lastname}",#results.users.username,
                'ownerphone': results.users.phone_number,
                'registrar': results.admin.username
            }
        
        if results:
            return res, 200


