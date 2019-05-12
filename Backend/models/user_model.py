from config import db
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Integer, Column, String, Integer, Boolean, Text, DateTime, Table, ForeignKey
# from post_comment_model import PostModel, CommentModel
# from question_answer_model import QuestionModel, AnswersModel
from . import Base

question_thumb_ups_table = Table(
    'question_thumb_ups',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('question_id', Integer, ForeignKey('questions.id'))
)

post_thumb_ups_table = Table(
    'post_thumb_ups',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('post_id', Integer, ForeignKey('posts.id'))
)


class ServiceModel(Base):
    __tablename__ = 'services'
    id = Column(Integer, primary_key=True)
    designation = Column(String(120), unique=True)
    service_employees = relationship("UserModel", back_populates="service")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_designation(cls, designation):
        return db.session.query(cls).filter_by(designation=designation).first()


class RoleModel(Base):
    __tablename__ = 'roles'
    id = Column(Integer, primary_key=True)
    designation = Column(String(120), unique=True)
    role_employees = relationship("UserModel", back_populates="role")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_designation(cls, designation):
        return db.session.query(cls).filter_by(designation=designation).first()


class UserModel(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(120), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(120), nullable=False)
    is_authenticated = Column(Boolean, nullable=False)
    is_active = Column(Boolean, nullable=False)

    name = Column(String(120), nullable=True)
    fname = Column(String(120), nullable=True)
    photo_link = Column(String(120), nullable=True)

    # Foreign Keys
    service_id = Column(Integer, db.ForeignKey('services.id'))
    service = relationship("ServiceModel", back_populates="service_employees")
    role_id = Column(Integer, db.ForeignKey('roles.id'))
    role = relationship("RoleModel", back_populates="role_employees")

    # ORM
    user_published_posts = relationship(
        "PostModel", back_populates="publisher")
    user_edited_posts = relationship("PostModel", back_populates="editor")
    user_comments = relationship("CommentModel", back_populates="commentator")
    user_published_questions = relationship(
        "QuestionModel", back_populates="publisher")
    user_edited_questions = relationship(
        "QuestionModel", back_populates="editor")
    user_answers = relationship("AnswersModel", back_populates="answerer")

    # thumbups = relationship("ThumbUpsModel", back_populates="user")

    supports = relationship(
        "QuestionModel",
        secondary=question_thumb_ups_table,
        back_populates="supporters")

    thumbups = relationship(
        "PostModel",
        secondary=post_thumb_ups_table,
        back_populates="thumbupers")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return db.session.query(cls).filter_by(username=username).first()

    @classmethod
    def return_all(cls):
        def to_json(x):
            return {
                'username': x.username,
                'password': x.password,
                'service': x.service.designation,
                'role': x.role.designation
            }
        return {'users': list(map(lambda x: to_json(x), UserModel.query.all()))}

    @classmethod
    def delete_all(cls):
        try:
            num_rows_deleted = db.session.query(cls).delete()
            db.session.commit()
            return {'message': '{} row(s) deleted'.format(num_rows_deleted)}
        except:
            return {'message': 'Something went wrong'}

    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)

    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)


class RevokedTokenModel(Base):
    __tablename__ = 'revoked_tokens'
    id = Column(Integer, primary_key=True)
    jti = Column(String(120))

    def add(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = cls.query.filter_by(jti=jti).first()
        return bool(query)
