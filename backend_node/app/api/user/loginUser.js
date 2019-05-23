/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import passport from 'passport';
import jwtSecret from '../../../config/jwtConfig';
import db from "../../../models"

/**
 * @swagger
 * /loginUser:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Logs in a user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - username
 *           - password
 *     responses:
 *       '200':
 *         description: User found and logged in successfully
 *       '401':
 *         description: Bad username, not found in db
 *       '403':
 *         description: Username and password don't match
 */

module.exports = (app) => {
  app.post('/loginUser', (req, res, next) => {
    passport.authenticate('login', (err, users, info) => {
      if (err) {
        console.error(`error ${err}`);
      }
      if (info !== undefined) {
        console.error(info.message);
        if (info.message === 'bad username') {
          res.status(401).send({ message: info.message });
        } else {
          res.status(403).send({ message: info.message });
        }
      } else {
        req.logIn(users, () => {
          db.user.findOne({
            where: {
              username: req.body.username,
            },
            include: [db.role, db.service]
          }).then((user) => {
            const token = jwt.sign({ id: user.id }, jwtSecret.secret);
            res.status(200).send({
              auth: true,
              token,
              user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                username: user.username,
                service: user.service,
                role: user.role
              }
            });
          });
        });
      }
    })(req, res, next);
  });
};
