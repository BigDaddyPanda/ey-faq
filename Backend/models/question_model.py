from config import db
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Integer, Boolean, Text, DateTime, Table, ForeignKey
from . import user_model, Base


class QuestionModel(Base):
    __tablename__ = 'questions'

    id = Column(Integer, primary_key=True)
    subject = Column(String(120), nullable=False)
    description = Column(Text, nullable=False)
    content = Column(Text, nullable=True)

    visited = Column(Integer, default=1)

    # ORM References
    # thumbups = relationship("ThumbUpsModel", back_populates="question")
    supporters = relationship(
        "UserModel", secondary=user_model.question_thumb_ups_table)

    question_answers = relationship("AnswersModel", back_populates="question")
    question_attachements = relationship(
        "AttachementModel", back_populates="question")

    publisher_id = Column(Integer, db.ForeignKey('users.id'))
    publisher = relationship(
        "UserModel",
        foreign_keys=[publisher_id],
        back_populates="user_published_questions")
    date_ajout = Column(DateTime, nullable=True)

    edited = Column(Boolean, nullable=True)
    editor_id = Column(Integer, db.ForeignKey('users.id'), nullable=False)
    editor = relationship(
        "UserModel", foreign_keys=[editor_id], back_populates="user_edited_questions")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    # @classmethod
    # def find_by_designation(cls, designation):
    #     return cls.query.filter_by(designation=designation).first()
