const emailer = require("../../tools/email");
const sequelize = require("sequelize");
module.exports = (app, db) => {
  app.get("/services", (req, res) =>
    db.service.findAll({
      include: [{
        model: db.user,
        attributes: ["username", "email"],
        include: [{
          model: db.role,
          attributes: ["designation"]
        }]
      }],
    }).then((result) => res.json(result))
  );

  app.get("/service/:id", (req, res) =>
    db.service.findByPk(req.params.id, {
      include: [{
        model: db.user,
        attributes: ["username", "email"],
        include: [{
          model: db.role,
          attributes: ["designation"]
        }]
      }]
    }).then((result) => res.json(result))
  );

  app.post("/service", (req, res) =>
    db.service.create({
      designation: req.body.designation
    }).then((result) => {
      res.json(result)
    })
  );

  app.put("/service/:id", (req, res) => {
    db.service.update({
      /**
       * Other stuff to update
       */
      designation: req.body.designation
    }, {
      where: {
        id: req.params.id
      }
    }).then((result) => res.json(result))
  });

  app.delete("/service/:id", (req, res) =>
    db.service.destroy({
      where: {
        id: req.params.id
      }
    }).then((result) => res.json(result))
  );
}