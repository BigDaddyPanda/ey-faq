const emailer = require("../../tools/email");

module.exports = (app, db) => {
  app.get("/services", (req, res) =>
    db.service.findAll().then((result) => res.json(result))
  );

  app.get("/service/:id", (req, res) =>
    db.service.findByPk(req.params.id).then((result) => res.json(result))
  );

  app.post("/service", (req, res) =>
    db.service.create({
      title: req.body.title,
      content: req.body.content
    }).then((result) => {
      res.json(result)
    })
  );

  app.put("/service/:id", (req, res) =>
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
  );

  app.delete("/service/:id", (req, res) =>
    db.service.destroy({
      where: {
        id: req.params.id
      }
    }).then((result) => res.json(result))
  );
}