from config import db
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Integer, Boolean, Text, DateTime, Table, ForeignKey


class AnswersModel(db.Model):
    __tablename__ = 'answers'

    id = Column(Integer, primary_key=True)
    content = Column(Text, nullable=True)
    edited = Column(Boolean, default=False, nullable=True)

    # ORM References

    question_id = Column(Integer, db.ForeignKey('questions.id'))
    question = relationship(
        "QuestionModel", back_populates="question_answers")

    answerer_id = Column(Integer, db.ForeignKey('users.id'))
    answerer = relationship("UserModel", back_populates="user_answers")
    date_ajout = Column(DateTime, nullable=True)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()
