from flask import Flask, jsonify, request
from flask_jwt import JWT, jwt_required, current_identity

from services import cache_service

UserStor

class User(object):

    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password

    def __str__(self):
        return "User(id='%s')" % self.id


user = User(1, 'user', 'password')


def authenticate(username, password):
    user = cache_service.
    if username == user.username and password == user.password:
        return user


def identity(payload):
    return user

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'super-secret'

jwt = JWT(app, authenticate, identity)


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    if request.method == 'OPTIONS':
        response.headers['Access-Control-Allow-Methods'] = 'DELETE, GET, POST, PUT'
        headers = request.headers.get('Access-Control-Request-Headers')
        if headers:
            response.headers['Access-Control-Allow-Headers'] = headers
    return response


@app.route('/is_authenticated')
@jwt_required()
def protected():
    return jsonify({
        'message': 'ok'
    })

app.run()
