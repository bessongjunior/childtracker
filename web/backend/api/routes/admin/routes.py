

import os
# from datetime import datetime, timezone, timedelta
from http import HTTPStatus
from functools import wraps
import logging, jwt

from flask import request, url_for, current_app
from flask_restx import Namespace, Resource, fields, reqparse
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage

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


assign_device_model = admin_ns.model('AssignDeviceModel', {
                                        "name": fields.String(),
                                        "serial_number": fields.String()
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

        # # create access token uwing JWT
        # # token = jwt.encode({'email': _email, 'exp': datetime.utcnow() + timedelta(minutes=30)}, BaseConfig.SECRET_KEY)

        admin_exists.set_jwt_auth_active(True)
        admin_exists.save()

        image_url = url_for('static', filename=f'profile/admin/{admin_exists.profile}', _external=True)

        return {"success": True,
                # "token": token,
                "user": admin_exists.toJSON(),
                "image_url": image_url
                }, HTTPStatus.CREATED


@admin_ns.route('/v1/logout')
class LogoutAdmin(Resource):
    ''' Logout resource route'''

    @token_required
    def post(self, current_user):
        '''Admin Logout endpoint'''

        # _JWT_token = request.headers.get('Authorization')
        # _jwt_token = request.headers["authorization"]

        admin_check = Admin.find_by_id(current_user.id)
        print(admin_check)
        admin_check.set_jwt_auth_active(False)
        admin_check.save()

        return {"success": True, "msg": "successfully logged out!"}, HTTPStatus.OK


@admin_ns.route('/v1/edit')
class EditAdminDetails(Resource):
    ''' Logout resource route'''

    @admin_ns.expect(admin_edit_model)
    @token_required
    def patch(self, current_user):
        '''Admin Logout endpoint'''

        req_data = request.get_json()

        _new_username = req_data.get("username")
        _new_email = req_data.get("email")
        _contact = req_data.get("contact")

        admin_updates = Admin.query.filter_by(id=int(current_user.id)).first()
        admin_updates.usename = _new_username
        admin_updates.email = _new_email
        admin_updates.contact = _contact

        db.session.commit()

        return {"success": True, "msg": "username and email successfully updated."}, HTTPStatus.ACCEPTED

    @admin_ns.expect(upload_parser)
    @token_required
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


# @admin_ns.route('v1/device/user_id/registration')
class RegisterUserDevice(Resource):
    ''' Logout resource route'''

    @admin_ns.expect(assign_device_model)
    @token_required
    def post(self, userid, current_user):
        '''post test'''

        req_data = request.get_json()

        _serial_number = req_data.get("serial_number")
        _name = req_data.get("name")
        user_id = userid

        # check userid exist

        check_user = Users.get_by_id(user_id)

        if not check_user:
            # add logs
            return {"success": False, "msg": "user do not exist"}, HTTPStatus.UNAUTHORIZED
        
        user_device = Devices(user_id=user_id, 
                              serial_number=_serial_number,
                              name=_name,
                              admin_id=current_user.id
                              )
        
        user_device.save()

        return {"success": True, "msg": "Device attributed to user"}, HTTPStatus.CREATED



@admin_ns.route('/alldevices')
class UserDevices(Resource):
    '''Return all devices and username in db'''

    # @user_ns.marshal_with(user_devices_all_model) # add schema
    def get(self):
        '''Endpoint to give all devices and username'''

        # users = Users.query.all()
    
        # res = [
        #     {
        #         'id': user.id, 
        #         # 'sn': device.serial_number, 
        #         'name': user.username, 
        #         'image_url': "fix image url",
        #         'devices': [
        #             { 
        #                 'id': device.id, 
        #                 'sn': device.serial_number, 
        #                 'name': device.name,
        #                 'task': device.task
        #             } for device in user.user_devices
        #         ]
        #     } for user in users
        # ]

        # return {"data": res}, HTTPStatus.OK

        devices  = Devices.query.all()

        resp = [
             {
                'id': device.id,
                'serial number': device.serial_number, 
                'name': device.name,
                'task': device.task,
                # 'owner': [{'name': user.name} for user in device.user_id]
             } for device in devices
        ]

        return {"data": resp}, HTTPStatus.OK
    

        

