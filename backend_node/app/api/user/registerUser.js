/* eslint-disable arrow-parens */
/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import passport from 'passport';
import db from "../../../models"
import jwtSecret from '../../../config/jwtConfig';
/**
 * @swagger
 * /registerUser:
 *   post:
 *     tags:
 *       - Users
 *     name: Register
 *     summary: Register a new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *           type: object
 *           properties:
 *             first_name:
 *               type: string
 *             last_name:
 *               type: string
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - username
 *           - email
 *           - password
 *     responses:
 *       '200':
 *         description: User created
 *       '403':
 *         description: Username or email already taken
 */

module.exports = app => {
  app.post('/registerUser', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
      if (err) {
        console.error(err);
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(403).send(info.message);
      } else {
        // eslint-disable-next-line no-unused-vars
        req.logIn(user, error => {
          console.log(user);
          const data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            username: user.username,
          };
          console.log(data);
          db.user.findOne({
            where: {
              username: data.username,
            },
            include: [db.role, db.service]
          }).then(user => {
            console.log(user);
            user
              .update({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
              })
              .then((u) => {
                console.log('user created in db');
                const token = jwt.sign({
                  id: u.id
                }, jwtSecret.secret);

                // let user = {
                //   username: u.username,
                //   first_name: u.first_name,
                //   last_name: u.last_name,
                //   email: u.email,
                //   token,
                // }
                res.status(200).send({
                  message: 'user created',
                  user: {
                    loggedIn: true,
                    user: u,
                    token
                  }
                });
              });
          });
        });
      }
    })(req, res, next);
  });
};