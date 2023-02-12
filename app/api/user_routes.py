from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/posts')
@login_required
def user_posts(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    posts = Post.query.filter_by(user_id=id).all()
    return jsonify([post.to_dict() for post in posts]), 200