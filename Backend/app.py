from config import db, app, jwt, api,manager

@app.before_first_request
def create_tables():
    db.create_all()


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return user_model.RevokedTokenModel.is_jti_blacklisted(jti)

import models.user_model as user_model
import resources.resources as user_resources, resources.service_resources as service_resources

api.add_resource(user_resources.UserRegistration, '/registration')
api.add_resource(user_resources.UserLogin, '/login')
api.add_resource(user_resources.UserLogoutAccess, '/logout/access')
api.add_resource(user_resources.UserLogoutRefresh, '/logout/refresh')
api.add_resource(user_resources.TokenRefresh, '/token/refresh')
api.add_resource(user_resources.AllUsers, '/users')
api.add_resource(user_resources.SecretResource, '/secret')
api.add_resource(service_resources.ServiceRegistration, '/service')

if __name__ == "__main__":
    # app.run(debug=True)
    # py .\app.py runserver --debug
    manager.run()
