from config import db
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Integer, Boolean, Text, DateTime, Table, ForeignKey


class AttachementModel(db.Model):
    __tablename__ = 'attachements'
    id = Column(Integer, primary_key=True)
    link = Column(String(120), nullable=False)

    # ORM References
    question_id = Column(Integer, db.ForeignKey('questions.id'))
    question = relationship(
        "QuestionModel", back_populates="question_attachements")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
