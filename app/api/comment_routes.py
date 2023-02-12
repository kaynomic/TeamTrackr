from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Post, Comment

comment_routes = Blueprint('comments', __name__)

# Get Comment by ID
@comment_routes.route('/<int:id>')
@login_required
def get_comment(id):
    comment = Comment.query.get(id)
    return comment.to_dict()


# Create a Comment
@comment_routes.route('/create', methods=["POST"])
@login_required
def create_comment():
    post_id = request.json['postId']
    body = request.json['body']

    post = Post.query.get(post_id)

    comment = Comment (
        user_id = int(current_user.id),
        post_id = int(post_id),
        body = body
    )

    db.session.add(comment)
    db.session.commit()

    return comment.to_dict()


# Edit Comment by ID
@comment_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_comment(id):
    comment = Comment.query.get(id)
    # post = Post.query.get(comment.post_id)

    if comment.user_id != current_user.id:
        return "You are not authorized to edit this comment"
    
    comment.body = request.json['body']
    
    db.session.commit()
    return comment.to_dict()


# Delete Comment by ID
@comment_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)

    if comment.user_id != current_user.id:
        return "You are not authorized to delete this comment"
    
    db.session.delete(comment)
    db.session.commit()

    return "Successfully Deleted"