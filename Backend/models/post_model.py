from config import db
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Integer, Boolean, Text, DateTime
from . import Base

class PostModel(Base):
    __tablename__ = 'posts'
    id = Column(Integer, primary_key=True)
    title = Column(String(120), nullable=False)
    description = Column(Text, nullable=False)
    content = Column(Text, nullable=True)

    visited = Column(Integer, default=1)

    # ORM References
    post_comments = relationship("CommentModel", back_populates="post")

    publisher_id = Column(Integer, db.ForeignKey('users.id'))
    publisher = relationship(
        "UserModel",
        foreign_keys=[publisher_id],
        back_populates="user_published_posts")
    date_ajout = Column(DateTime, nullable=True)

    edited = Column(Boolean, nullable=True)
    editor_id = Column(Integer, db.ForeignKey('users.id'), nullable=False)
    editor = relationship("UserModel",
                          foreign_keys=[editor_id],
                          back_populates="user_edited_posts")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    # @classmethod
    # def find_by_designation(cls, designation):
    #     return cls.query.filter_by(designation=designation).first()


