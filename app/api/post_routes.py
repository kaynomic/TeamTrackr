from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Post, Comment

post_routes = Blueprint('posts', __name__)

# Get Post by ID
@post_routes.route('/<int:id>')
@login_required
def get_post(id):
    post = Post.query.get(id)
    return post.to_dict()

#Get All Posts
@post_routes.route('/')
def all_posts():
    posts = Post.query.all()
    posts_list = [post.to_dict() for post in posts]
    return jsonify(posts_list)

#Get All Comments From A Post
@post_routes.route('/<int:id>/comments')
def post_comments(id):
    post = Post.query.get(id)
    comments = post.comments
    return jsonify([comment.to_dict() for comment in comments])


# Create a Post
@post_routes.route('/create', methods=["POST"])
@login_required
def create_post():

    post = Post (
        user_id = current_user.id,
        body = request.json["body"]
    )

    db.session.add(post)
    db.session.commit()

    return post.to_dict()


# Edit Post by ID
@post_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_post(id):
    post = Post.query.get(id)
    post.body = request.json['body']

    if post.user_id != current_user.id:
        return "You are not authorized to edit this post"
    
    db.session.commit()
    return post.to_dict()


# Delete Post by ID
@post_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get(id)

    if post.user_id != current_user.id:
        return "You are not authorized to delete this post"
    
    db.session.delete(post)
    db.session.commit()

    return "Successfully Deleted"