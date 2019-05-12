import express from 'express';
import Cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import passport from 'passport';
const faker = require("faker");
const times = require("lodash.times");
const random = require("lodash.random");

const app = express();
const db = require("./models");

const API_PORT = process.env.API_PORT || 5000;

require('./config/passport');
app.use(Cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(passport.initialize());
app.use(express.static("app/public"));

require('./app/api/user/loginUser')(app);
require('./app/api/user/registerUser')(app);
require('./app/api/user/forgotPassword')(app);
require('./app/api/user/resetPassword')(app);
require('./app/api/user/updatePassword')(app);
require('./app/api/user/updatePasswordViaEmail')(app);
require('./app/api/user/findUsers')(app);
require('./app/api/user/deleteUser')(app);
require('./app/api/user/updateUser')(app);

// eslint-disable-next-line no-console

// {force: true} for the hard times
db.sequelize.sync().then(() => {
    
    // populate author table with dummy data
    // app.listen(8989, () => console.log("App listening on port 8080!"));
    // db.service.bulkCreate(
    //     times(10, () => ({
    //         designation: faker.lorem.words(1),
    //     }))
    // );
    // db.role.bulkCreate(
    //     times(10, () => ({
    //         designation: faker.lorem.words(1),
    //     }))
    // );
 
    db.user.create({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        resetPasswordToken: faker.lorem.text(100),
        resetPasswordExpires: faker.lorem.text(100),
        service_id:1,
        role_id:1
    })
    console.clear()
    console.log("Data Base and Models Created and Mapped Successfully")
    app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
});



module.exports = app;