from config import db
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Integer, Boolean, Text, DateTime


class PostModel(db.Model):
    __tablename__ = 'posts'
    id = Column(Integer, primary_key=True)
    title = Column(String(120), nullable=False)
    description = Column(Text, nullable=False)
    content = Column(Text, nullable=True)

    visited = Column(Integer, default=1)

    # ORM References
    post_comments = relationship("CommentModel", back_populates="post")

    publisher_id = Column(Integer, db.ForeignKey('users.id'))
    publisher = relationship("UserModel", back_populates="user_published_posts")
    date_ajout = Column(DateTime, nullable=True)

    edited = Column(Boolean, nullable=True)
    editor_id = Column(Integer, db.ForeignKey('users.id'), nullable=False)
    editor = relationship("UserModel", back_populates="user_edited_posts")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    # @classmethod
    # def find_by_designation(cls, designation):
    #     return cls.query.filter_by(designation=designation).first()


class CommentModel(db.Model):
    __tablename__ = 'comments'

    id = Column(Integer, primary_key=True)
    content = Column(Text, nullable=True)
    edited = Column(Boolean, default=False, nullable=True)

    # ORM References

    post_id = Column(Integer, db.ForeignKey('users.id'))
    post = relationship("PostModel", back_populates="post_comments")

    commentator_id = Column(Integer, db.ForeignKey('users.id'))
    commentator = relationship("UserModel", back_populates="user_comments")
    date_ajout = Column(DateTime, nullable=True)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()
