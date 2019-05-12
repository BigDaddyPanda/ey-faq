import resources.roles_resource as role_resources
import resources.service_resources as service_resources
import resources.resources as user_resources
import models.user_model as user_model
from config import db, app, jwt, api, manager
from featured import ts


@app.before_first_request
def create_tables():
    db.create_all()


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return user_model.RevokedTokenModel.is_jti_blacklisted(jti)


@app.route('/confirm/<token>')
def confirm_email(token):
    try:
        email = ts.loads(token, salt="email-confirm-key", max_age=86400)
    except:
        abort(404)

    user = User.query.filter_by(email=email).first_or_404()

    user.email_confirmed = True

    db.session.add(user)
    db.session.commit()

    # return redirect(url_for('signin'))
    return "Registered! Ok"


api.add_resource(user_resources.UserRegistration, '/registration')
api.add_resource(user_resources.UserLogin, '/login')
api.add_resource(user_resources.UserLogoutAccess, '/logout/access')
api.add_resource(user_resources.UserLogoutRefresh, '/logout/refresh')
api.add_resource(user_resources.TokenRefresh, '/token/refresh')
api.add_resource(user_resources.AllUsers, '/users')
api.add_resource(user_resources.SecretResource, '/secret')

api.add_resource(service_resources.ServiceRegistration, '/service')
api.add_resource(role_resources.RoleRegistration, '/role')

if __name__ == "__main__":
    # app.run(debug=True)
    # py .\app.py runserver --debug
    manager.run()
