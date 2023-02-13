from .db import db, environment, SCHEMA, add_prefix_for_prod
# from app.models import db, User, Server, Message, Channel, server_member
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin


class Comment(db.Model):
    __tablename__ = 'comments'

    # Add when building models
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id'), ondelete='CASCADE'))
    body = db.Column(db.String(200), nullable=False)
    image = db.Column(db.String(500))

    #Relationships
    comment_creator = db.relationship("User", back_populates='user_comments')
    post = db.relationship("Post", back_populates='comments')
    

    @property
    def __repr__(self):
        return f"<Comment ID: {self.id}, User ID: {self.user_id}, Post ID: {self.post_id}, Body: {self.body}>"

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'image': self.image,
            'user': self.comment_creator.to_dict_basic()
        }
    
    
    def to_dict_basic(self):
        return {
            'id': self.id,
            'body': self.body,
            'image': self.image
        }