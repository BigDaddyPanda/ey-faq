const emailer = require("../../tools/email");

module.exports = (app, db) => {
  app.get("/users", (req, res) =>
    db.user.findAll({ include : [db.service] }).then((result) => res.json(result))
  );

  app.get("/user/:id", (req, res) =>
    db.user.findByPk(req.params.id).then((result) => res.json(result))
  );

  app.post("/user", (req, res) =>
    db.user.create({
      designation: req.body.designation
    }).then((result) => {
      res.json(result)
    })
  );

  app.put("/user/:id", (req, res) => {
    db.user.update({
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

  app.delete("/user/:id", (req, res) =>
    db.user.destroy({
      where: {
        id: req.params.id
      }
    }).then((result) => res.json(result))
  );
}