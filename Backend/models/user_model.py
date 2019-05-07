from config import db
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Integer, Column, String, Integer, Boolean, Text, DateTime, Table, ForeignKey
# from post_comment_model import PostModel, CommentModel
# from question_answer_model import QuestionModel, AnswersModel


class ServiceModel(db.Model):
    __tablename__ = 'services'
    id = Column(Integer, primary_key=True)
    designation = Column(String(120), unique=True)
    service_employees = relationship("UserModel", back_populates="service")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_designation(cls, designation):
        return cls.query.filter_by(designation=designation).first()


class RoleModel(db.Model):
    __tablename__ = 'roles'
    id = Column(Integer, primary_key=True)
    designation = Column(String(120), unique=True)
    role_employees = relationship("UserModel", back_populates="role")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_designation(cls, designation):
        return cls.query.filter_by(designation=designation).first()


class UserModel(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(120), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(120), nullable=False)

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

    thumbups = relationship("ThumbUpsModel", back_populates="user")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

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


class RevokedTokenModel(db.Model):
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


###


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
    publisher = relationship(
        "UserModel", back_populates="user_published_posts")
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


# question_thumb_ups_table = Table(
#     'question_thumb_ups',
#     Column('user_id', Integer, ForeignKey('users.id')),
#     Column('question_id', Integer, ForeignKey('questions.id'))
# )


class ThumbUpsModel(db.Model):
    __tablename__ = 'thumbups'
    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, db.ForeignKey('users.id'), nullable=False)
    user = relationship(
        "UserModel", back_populates="thumbups")
    question_id = Column(Integer, db.ForeignKey('questions.id'), nullable=False)
    question = relationship(
        "QuestionModel", back_populates="thumbups")


class QuestionModel(db.Model):
    __tablename__ = 'questions'

    id = Column(Integer, primary_key=True)
    subject = Column(String(120), nullable=False)
    description = Column(Text, nullable=False)
    content = Column(Text, nullable=True)

    visited = Column(Integer, default=1)

    # ORM References
    thumbups = relationship("ThumbUpsModel", back_populates="question")

    question_answers = relationship("AnswersModel", back_populates="question")
    question_attachements = relationship(
        "AttachementModel", back_populates="question")

    publisher_id = Column(Integer, db.ForeignKey('users.id'))
    publisher = relationship(
        "UserModel", back_populates="user_published_questions")
    date_ajout = Column(DateTime, nullable=True)

    edited = Column(Boolean, nullable=True)
    editor_id = Column(Integer, db.ForeignKey('users.id'), nullable=True)
    editor = relationship(
        "UserModel", back_populates="user_edited_questions")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    # @classmethod
    # def find_by_designation(cls, designation):
    #     return cls.query.filter_by(designation=designation).first()


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
