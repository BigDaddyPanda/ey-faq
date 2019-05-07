from flask_restful import Resource, reqparse
from models.user_model import RoleModel
# from flask_jwt_extended import (create_access_token, create_refresh_token,
#                                 jwt_required, jwt_refresh_token_required, 
#                                   get_jwt_identity, get_raw_jwt)

parser = reqparse.RequestParser()
parser.add_argument(
    'designation', help='This field cannot be blank', required=True)

class RoleRegistration(Resource):
    def post(self):
        data = parser.parse_args()
        if RoleModel.find_by_designation(data['designation']):
            return {'message': 'Role {} already exists'.format(data['designation'])}

        new_role = RoleModel(
            designation=data['designation']
        )

        try:
            new_role.save_to_db()
            return {
                'message': 'Role {} was created'.format(data['designation']),
            }
        except:
            return {'message': 'Something went wrong'}, 500
