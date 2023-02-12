from .db import db, environment, SCHEMA, add_prefix_for_prod
from .follow import Follow
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    image = db.Column(db.String(1000))
    follower_id = db.Column(db.Integer)
    hashed_password = db.Column(db.String(255), nullable=False)

    #Relationships
    user_posts = db.relationship("Post", back_populates= 'post_creator', cascade='all, delete')
    user_comments = db.relationship("Comment", back_populates= 'comment_creator', cascade='all, delete')
    following = db.relationship("Follow", foreign_keys=[Follow.follower_id], back_populates='follower')
    followers = db.relationship("Follow", foreign_keys=[Follow.followee_id], back_populates='followee')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def __repr__(self):
        return f"<User ID: {self.id}, Username: {self.username}, Email: {self.email}"

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'image': self.image,
            'posts': [post.to_dict_basic() for post in self.user_posts],
            'comments': [comment.to_dict_basic() for comment in self.user_comments]
        }
    
    def to_dict_follow(self):
        return {
            'id': self.id,
            'username': self.username,
            'following': [following.to_dict_following() for following in self.following],
            'followers': [follower.to_dict_follower() for follower in self.followers]
        }


    def to_dict_basic(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'image': self.image
        }