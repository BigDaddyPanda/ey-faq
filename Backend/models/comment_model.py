from config import db
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Integer, Boolean, Text, DateTime

from . import Base


class CommentModel(Base):
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

    # @classmethod
    # def find_by_username(cls, username):
    #     return cls.query.filter_by(username=username).first()
