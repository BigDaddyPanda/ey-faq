from config import app, mail
from itsdangerous import URLSafeTimedSerializer
from flask import url_for

ts = URLSafeTimedSerializer(app.config["SECRET_KEY"])


def send_email(email, subject, content):
    msg = Message(
        subject, sender=app.config["MAIL_USERNAME"], recipients=[email])
    msg.html = content
    mail.send(msg)


def confirmation_email(email):
    token = ts.dumps(email, salt='email-confirm-key')
    confirm_url = url_for(
        'confirm_email',
        token=token,
        _external=True)

    html = render_template(
        'email/activate.html',
        confirm_url=confirm_url)

    send_email(user.email, subject, html)

    return (url_for("index"))
