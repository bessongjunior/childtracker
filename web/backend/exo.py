import os, json

from flask import Flask, request, jsonify
from flask_restx import Api, Resource
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from asgiref.wsgi import WsgiToAsgi


# db = SQLAlchemy()

app = Flask(__name__)

app.config["SECRET_KEY"] = 'MY_SECRET_KEY_123'
# app.config['SQLALCHEMY_DATABASE_URI'] = '68'
# db.init_app(app)

basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] =\
           'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    content = db.Column(db.Text)
    comments = db.relationship('Comment', backref='post')

    def __repr__(self):
        return f'<Post "{self.title}">'


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))

    def __repr__(self):
        return f'<Comment "{self.content[:20]}...">'

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
    
@app.route('/api/comments', methods=['GET'])
def get_comments():
    post_id = request.args.get('post_id')
    if not post_id:
        return 'Missing post_id parameter', 400

    comments = Comment.query.filter_by(post_id=post_id).all()

    response = {'comments': []}
    for comment in comments:
        response['comments'].append({
            'id': comment.id,
            'content': comment.content,
            'post_title': comment.post.title
        })

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)