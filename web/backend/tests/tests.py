
import pytest
import json
from http import HTTPStatus

from ..api import app
from ..api import asgi_app

"""
   Sample test data
"""

DUMMY_USERNAME = "cotub"
DUMMY_EMAIL = "cotub@cot-ub.cm"
DUMMY_PASS = "newpassword" 
DUMMY_FIRSTNAME = "cot"
DUMMY_LASTNAME = "ub"
DUMMY_DOB = "2023-03-08"
DUMMY_SEX = "Female"
DUMMY_CONTACT = 651481602
DUMMY_PROVINCE = "South West"
DUMMY_COUNTRY = "Cameroon"

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

# def test_user_signup(client):
#     """
#        Tests user/v1/users/register API
#     """
#     response = client.post(
#         "user/v1/users/register",
#         data=json.dumps(
#             {
#                 "username": DUMMY_USERNAME,
#                 "email": DUMMY_EMAIL,
#                 "password": DUMMY_PASS,
#                 "firstname": DUMMY_FIRSTNAME,
#                 "lastname": DUMMY_LASTNAME,
#                 "dob": DUMMY_DOB,
#                 "phone_number": DUMMY_CONTACT,
#                 "sex": DUMMY_SEX,
#                 "province": DUMMY_PROVINCE,
#                 "countrty": DUMMY_COUNTRY
#             }
#         ),
#         content_type="application/json")

#     data = json.loads(response.data.decode())
#     assert response.status_code == HTTPStatus.CREATED
#     assert "The user was successfully registered" in data["msg"]


# def test_user_signup_invalid_data(client):
#     """
#        Tests user/v1/users/register API: invalid data like email field empty
#     """
#     response = client.post(
#         "user/v1/users/register",
#         data=json.dumps(
#             {
#                 "username": DUMMY_USERNAME,
#                 "email": "",
#                 "password": DUMMY_PASS,
#                 "password": DUMMY_PASS,
#                 "firstname": DUMMY_FIRSTNAME,
#                 "lastname": DUMMY_LASTNAME,
#                 "dob": '2023/11/01',
#                 "phone_number": DUMMY_CONTACT,
#                 "sex": DUMMY_SEX,
#                 "province": DUMMY_PROVINCE,
#                 "countrty": DUMMY_COUNTRY
#             }
#         ),
#         content_type="application/json")

#     data = json.loads(response.data.decode())
#     assert response.status_code == 400 # replace with 422 in flask app.
#     assert "'' is too short" in data["msg"]


# def test_user_login_correct(client):
#     """
#        Tests user/v1/users/signup API: Correct credentials
#     """
#     response = client.post(
#         "user/v1/users/login",
#         data=json.dumps(
#             {
#                 "email": DUMMY_EMAIL,
#                 "password": DUMMY_PASS
#             }
#         ),
#         content_type="application/json")

#     data = json.loads(response.data.decode())
#     assert response.status_code == HTTPStatus.OK
#     assert data["token"] != ""


# def test_user_login_error(client):
#     """
#        Tests /user/v1/users/signup API: Wrong credentials
#     """
#     response = client.post(
#         "user/v1/users/login",
#         data=json.dumps(
#             {
#                 "email": DUMMY_EMAIL,
#                 "password": DUMMY_CONTACT
#             }
#         ),
#         content_type="application/json")

#     data = json.loads(response.data.decode())
#     assert response.status_code == 400
#     assert "Wrong credentials." in data["msg"]


# def test_user_edit(client):
#     """
#        Tests v1/users/edit API: Wrong credentials
#     """
#     response = client.patch(
#         "user/v1/users/edit",
#         data=json.dumps(
#             {
#                 "email": DUMMY_EMAIL,
#                 "username": DUMMY_USERNAME
#             }
#         ),
#         content_type="application/json")

#     data = json.loads(response.data.decode())
#     assert response.status_code == HTTPStatus.ACCEPTED
#     assert "Wrong credentials." in data["msg"]


# # def test_user_edit_pic(client):
# #     """
# #        Tests v1/users/edit API: Wrong credentials
# #     """
# #     response = client.put(
# #         "/v1/users/edit",
# #         data=json.dumps(
# #             {
# #                 "profile_picture": "add a method to load an image here from path"
# #             }
# #         ),
# #         content_type="application/json")

# #     data = json.loads(response.data.decode())
# #     assert response.status_code == HTTPStatus.ACCEPTED
# #     assert "Wrong credentials." in data["msg"]


# def test_all_users(client):
#     """
#        Tests /v1/allusers API: Wrong credentials
#     """
#     response = client.get(
#         "user/v1/allusers",
#         # data=json.dumps(
#         #     {
#         #         "email": DUMMY_EMAIL,
#         #         "username": DUMMY_USERNAME
#         #     }
#         # ),
#         content_type="application/json")

#     data = json.loads(response.data.decode())
#     assert response.status_code == HTTPStatus.ACCEPTED
#     assert "Wrong credentials." in data["msg"]

