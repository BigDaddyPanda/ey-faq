from flask_restful import Resource, reqparse
from models.user_model import ServiceModel
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)

parser = reqparse.RequestParser()
parser.add_argument(
    'designation', help='This field cannot be blank', required=True)

class ServiceRegistration(Resource):
    def post(self):
        data = parser.parse_args()
        if ServiceModel.find_by_designation(data['designation']):
            return {'message': 'Service {} already exists'.format(data['designation'])}

        new_service = ServiceModel(
            designation=data['designation']
        )

        try:
            new_service.save_to_db()
            return {
                'message': 'Service {} was created'.format(data['designation']),
            }
        except:
            return {'message': 'Something went wrong'}, 500
