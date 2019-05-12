var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'eymentor.eymentor@gmail.com',
        pass: 'eymentor123'
    }
});

module.exports = (to, text) => {
    var mailOptions = {
        from: 'eymentor.eymentor@gmail.com',
        to,
        subject: 'Sending Email using Node.js',
        text
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}