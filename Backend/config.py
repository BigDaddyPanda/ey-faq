from flaskext.mysql import MySQL
from flask_jwt_extended import JWTManager

from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_script import Manager

import os

# Alternative SQL Alchemy initiation for factory settings
# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker

# engine = create_engine('mysql://root:@localhost/sampledb')
# # use session_factory() to get a new Session
# _SessionFactory = sessionmaker(bind=engine)

# Base = declarative_base()

# def session_factory():
#     Base.metadata.create_all(engine)
#     return _SessionFactory()

# Where data will be stored
UPLOAD_FOLDER = r"D:\Work\Nizar Vue\Backend\img"
if not os.path.isdir(UPLOAD_FOLDER):
    os.mkdir(UPLOAD_FOLDER)
ALLOWED_EXTENSIONS = set(["txt", "pdf", "png", "jpg", "jpeg", "gif"])

app = Flask(__name__)
api = Api(app)
CORS(app)


mysql = MySQL()

# MySQL configurations
# app.config['MYSQL_DATABASE_USER'] = 'root'
# app.config['MYSQL_DATABASE_PASSWORD'] = ''
# app.config['MYSQL_DATABASE_DB'] = 'sampledb'
# app.config['MYSQL_DATABASE_HOST'] = 'localhost'
# mysql.init_app(app)

# SQLALCHEMY Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/sampledb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'some-secret-string'

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# JWT
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(app)

app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

# Upload folder
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# The manager will handle external scripts such as the ones used 
# for Migration management
# thanks to this manager, now you can run these commands

# python app.py db init
# python app.py db migrate
# python app.py db upgrade 

# or simply
# flask db init
# flask db migrate
# flask db upgrade

manager = Manager(app)
