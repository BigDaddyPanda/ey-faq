const emailer = require("../../tools/email");
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
import bcrypt from 'bcrypt';

module.exports = (app, db) => {
  app.get("/users", (req, res) =>
    db.user.findAll({ include: [db.service] }).then((result) => res.json(result))
  );

  app.get("/user/:id", (req, res) =>
    db.user.findByPk(req.params.id).then((result) => res.json(result))
  );
  app.get("/userProfile", (req, res) =>
    db.user.scope("withoutCredentials").findOne({
      where: {
        [Op.or]: [
          {
            username: req.query.username,
          }
        ],
      }
    }).then((result) => {
      // console.log(result);
      res.json(result);
    })
  );

  app.post("/user", (req, res) =>
    db.user.create({
      designation: req.body.designation
    }).then((result) => {
      res.json(result)
    })
  );

  app.put("/user/:id", async (req, res) => {
    var myOld = await db.user.findByPk(req.body.id)
    var newHashPass = null;
    if (req.body.password != '' && req.body.password)
      newHashPass = await bcrypt.hash(req.body.password, 12);
    else
      newHashPass = myOld.password;
    db.user.update({
      /**
       * Other stuff to update
       */
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      password: newHashPass,
      serviceId: req.body.serviceId,
      photo_link: req.body.photo_link,
      roleId: req.body.roleId,
    }, {
        where: {
          [Op.or]: [
            {
              id: req.params.id
            }
          ]
        }
      }).then((result) => res.json(result))
  });

  app.delete("/user/:id", (req, res) =>
    db.user.destroy({
      where: {
        id: req.params.id
      }
    }).then((result) => res.json(result))
  );
}