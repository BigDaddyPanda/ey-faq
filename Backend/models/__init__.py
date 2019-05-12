# import post_comment_model
# import question_answer_model
# import user_model
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

from .post_model import PostModel
from .question_model import QuestionModel
from .user_model import ServiceModel, RoleModel, UserModel
from .comment_model import CommentModel
from .answer_model import AnswersModel
from .attachement_model import AttachementModel




"""
This is your model folder
if you want to add a model, make sure to create its class inheriting from this (Base) 

```
class ChatLog(Base)
```


In case you want to make an association one,
```
friendships = Table('friendships',
                    Base.metadata,
                    Column('follower_id', Integer(), ForeignKey('user.id')),
                    Column('followed_id', Integer(), ForeignKey('user.id'))
)```
"""
