import express from 'express';
import Cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
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

const genericDataTable = require('./app/api/genericDataTable');

const uploaderHandler = require('./tools/uploader');
uploaderHandler(app);
// eslint-disable-next-line no-console
// bcrypt.hash("azerty123", 12).then(e => console.log("azerty123",e));
var def_pw_hash = "$2b$12$cE2AWwWhdozjhXRHyCHoTeR2INQtuefCRfHjx68NfSGxXKkuOjPyu";

// {force: true} for the hard times
db.sequelize.sync().then(() => {
// db.sequelize.sync({ force: true }).then(() => {
    // // // populate author table with dummy data
    // db.service.bulkCreate(
    //     [
    //         { designation: "General Information" },
    //         { designation: "Resources Humaines" },
    //         { designation: "Réseau et Sécurité" },
    //         { designation: "Internet et Techno" }
    //     ]
    // );
    // db.role.bulkCreate(
    //     [
    //         { designation: "admin" },
    //         { designation: "agent" },
    //     ]
    // );

    // let defaultAdmins = times(3, () => ({
    //     email: faker.internet.email(),
    //     username: faker.internet.userName(),
    //     password: def_pw_hash,
    //     first_name: faker.name.firstName(),
    //     last_name: faker.name.lastName(),
    //     serviceId: 1,
    //     roleId: 1
    // }))
    // defaultAdmins[1].serviceId = 2;
    // defaultAdmins[2].serviceId = 3;
    // db.user.bulkCreate(defaultAdmins);
    // db.user.bulkCreate(times(10, () => ({
    //     email: faker.internet.email(),
    //     username: faker.internet.userName(),
    //     password: def_pw_hash,
    //     first_name: faker.name.firstName(),
    //     last_name: faker.name.lastName(),
    //     serviceId: random(1, 3),
    //     roleId: 2
    // })))
    // db.post.bulkCreate(times(10, () => ({
    //     title: faker.lorem.sentence(),
    //     description: faker.lorem.sentence(),
    //     content: faker.lorem.text(),
    //     serviceId: random(1, 4)
    // })))
    // db.question.bulkCreate(times(10, () => ({
    //     title: faker.lorem.sentence(),
    //     description: faker.lorem.sentence(),
    //     content: faker.lorem.text(),
    //     serviceId: random(1, 4)
    // })))

    db.user.findAll().then(function (users) {
        users.forEach(usr => {
            db.question.findByPk((usr.id+1)%10).then(function (qst) {
                // usr.setQuestions([qst]);
                // Fuck this sequelize can't have multiple entries with the same fk,fk
                // usr.addQuestion(qst, { through: { participation: 'answerz' } });
                db.user_question.create({
                    questionId:qst.id,
                    userId:usr.id,
                    participation:'asker'
                })
            })
        });
    });



    require("./app/api/answer")(app, db);
    require("./app/api/attachement")(app, db);
    require("./app/api/comment")(app, db);
    require("./app/api/post")(app, db);
    require("./app/api/question")(app, db);
    require("./app/api/role")(app, db);
    require("./app/api/globalDataProvider")(app, db);
    require("./app/api/service")(app, db);
    require("./app/api/user")(app, db);
    genericDataTable(app, db.service, "api/service");
    genericDataTable(app, db.question, "api/question");
    genericDataTable(app, db.answer, "api/answer");
    genericDataTable(app, db.attachement, "api/attachement");
    genericDataTable(app, db.post, "api/post");
    genericDataTable(app, db.comment, "api/comment");
    genericDataTable(app, db.user, "api/user");

    console.clear()
    console.log("Data Base and Models Created and Mapped Successfully")
    app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
});



module.exports = app;