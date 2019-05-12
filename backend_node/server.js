import express from 'express';
import Cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import passport from 'passport';

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

db.sequelize.sync().then(() => {
    // populate author table with dummy data
    // app.listen(8989, () => console.log("App listening on port 8080!"));
    console.log("Data Base and Models Created and Mapped Successfully")
    app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
});



module.exports = app;