# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from datetime import datetime, date
from typing import Optional


from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.expression import text
# from sqlalchemy.orm import relationship

db = SQLAlchemy()

class Sex(str, db.Enum):
    '''Define the sex, either mail or female'''
    MALE = 'Male'
    FEMALE = 'Female'

class Users(db.Model):
    id: Optional[int | str] = db.Column(db.Integer(), primary_key=True, unique=True)
    firstname: str = db.Column(db.String(), nullable=False)
    lastname: str = db.Column(db.String(), nullable=False)
    username: str = db.Column(db.String(), nullable=False)
    email: str = db.Column(db.String(), nullable=True, unique=True)
    password: str = db.Column(db.Text(), nullable=True)
    dob: date = db.Column(db.Date(), nullable=False)
    sex: Sex = db.Column(db.String, nullable=False)
    phone_number: int = db.Column(db.Integer(), nullable=False, unique=True)
    country: str = db.Column(db.String(), nullable=False)
    province: str = db.Column(db.String(), nullable=False)
    profile_photo: str = db.Column(db.String(), nullable=False, default='default.jpg')
    jwt_auth_active: bool = db.Column(db.Boolean())
    date_joined: datetime = db.Column(db.DateTime(timezone=True), default=datetime.utcnow, server_default=text('CURRENT_TIMESTAMP'))
    date_updated: datetime = db.Column(db.DateTime(timezone=True), onupdate=datetime.utcnow, server_default=text('CURRENT_TIMESTAMP'))

    user_devices = db.relationship('Devices',backref=db.backref('users', lazy=True))
    # use classVar / relationship to typecheck its a relationship in sqlalchemy

    def __repr__(self):
        return f"User {self.username}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def update_email(self, new_email):
        self.email = new_email

    def update_username(self, new_username):
        self.username = new_username

    def check_jwt_auth_active(self):
        return self.jwt_auth_active

    def set_jwt_auth_active(self, set_status):
        self.jwt_auth_active = set_status

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()
    
    @classmethod
    def get_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    def toDICT(self):

        cls_dict = {}
        cls_dict['_id'] = self.id
        cls_dict['username'] = self.username
        cls_dict['email'] = self.email

        return cls_dict

    def toJSON(self):

        return self.toDICT()


class JWTTokenBlocklist(db.Model):
    id: int = db.Column(db.Integer(), primary_key=True)
    jwt_token: str = db.Column(db.String(), nullable=False)
    created_at: datetime = db.Column(db.DateTime(), nullable=False)

    def __repr__(self):
        return f"Expired Token: {self.jwt_token}"

    def save(self):
        db.session.add(self)
        db.session.commit()


class Devices(db.Model):
    ''' Thsi is the device table'''

    id: Optional[str] = db.Column(db.Integer(), primary_key=True, nullable=False)
    serial_number: str = db.Column(db.String(), nullable=False, unique=True)
    name: str = db.Column(db.String(), nullable=False, unique=True)
    task: bool = db.Column(db.Boolean(), default=False)
    date_obtained: datetime = db.Column(db.DateTime(timezone=True), default=datetime.utcnow, server_default=text('CURRENT_TIMESTAMP'))

    user_id = db.Column(db.Integer, db.ForeignKey('users.id')) #, nullable=True
    admin_id = db.Column(db.Integer, db.ForeignKey('admin.id'))
    # use classVar / relationship to typecheck its a relationship in sqlalchemy


    def save(self):
        db.session.add(self)
        db.session.commit()


    def __ref__(self):
        return f'user device / names of device is {self.name}'
    
    @classmethod
    def get_by_serial(cls, serial):
        return cls.query.filter_by(serial_number=serial).first()
    
    @classmethod
    def get_by_name(cls, name):
        return cls.query.filter_by(name=name).first()


class Admin(db.Model):
    '''This represent our admin table in db'''

    id: int = db.Column(db.Integer, primary_key=True)
    first_name: str = db.Column(db.String, nullable=False)
    last_name: str = db.Column(db.String, nullable=False)
    admin_username: str = db.Column(db.String, nullable=False, unique=True)
    email: str = db.Column(db.String, nullable=False, unique=True)
    password: str = db.Column(db.String, nullable=True, unique=False)
    jwt_auth_active = db.Column(db.Boolean())
    date_joined: datetime = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    date_modified: datetime = db.Column(db.DateTime, onupdate=datetime.utcnow)
    # image_file: str = db.Column(db.String, nullable=True, default='avatar.jpg')
    profile: str = db.Column(db.String, unique=False, nullable=False, default='profile.jpg')

    register_device = db.relationship('Devices',backref=db.backref('admin', lazy=True))
# use classVar / relationship to typecheck its a relationship in sqlalchemy

    # def __init__(self):
    #     pass

    def __repr__(self):
        return f"Admin {self.admin_username}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def check_jwt_auth_active(self):
        return self.jwt_auth_active

    def set_jwt_auth_active(self, set_status):
        self.jwt_auth_active = set_status

    def update_email(self, new_email):
        self.email = new_email

    def update_username(self, new_username):
        self.admin_username = new_username

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()
    
    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    def toDICT(self):

        cls_dict = {}
        cls_dict['_id'] = self.id
        cls_dict['username'] = self.admin_username
        cls_dict['email'] = self.email

        return cls_dict

    def toJSON(self):

        return self.toDICT()


class TrackHistory():
    '''Table to collect user track History'''

    id: Optional[int] = db.Column(db.Integer(), primary_key=True, nullable=False)
    device_id: int = db.Column(db.Integer, db.ForeignKey('devices.id'), nullable=False)
    location: str = db.Column(db.String(), nullable=True)
    status: str = db.Column(db.String(), nullable=False)
    notes: str = db.Column(db.Text(), nullable=True)
    timestamp: datetime = db.Column(db.DateTime(timezone=True), default=datetime.utcnow, server_default=text('CURRENT_TIMESTAMP'))

    # Define the relationship to the Devices table
    device = db.relationship('Devices', backref=db.backref('track_history', lazy=True))

    def save(self):
        '''Saves the tracking history record to the database.'''
        db.session.add(self)
        db.session.commit()

    def __ref__(self):
        return f'Tracking for device {self.device_id} at {self.timestamp}'

    @classmethod
    def get_by_device_id(cls, device_id):
        '''Retrieves all tracking history for a specific device.'''
        return cls.query.filter_by(device_id=device_id).all()
