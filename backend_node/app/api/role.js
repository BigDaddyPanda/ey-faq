const emailer = require("../../tools/email");

module.exports = (app, db) => {
  app.get("/roles", (req, res) =>
    db.role.findAll().then((result) => res.json(result))
  );

  app.get("/role/:id", (req, res) =>
    db.role.findByPk(req.params.id).then((result) => res.json(result))
  );

  app.post("/role", (req, res) =>
    db.role.create({
      title: req.body.title,
      content: req.body.content
    }).then((result) => {
      res.json(result)
    })
  );

  app.put("/role/:id", (req, res) =>
    db.role.update({
      /**
       * Other stuff to update
       */
      content: req.body.content
    }, {
      where: {
        id: req.params.id
      }
    }).then((result) => {
      let to = db.user.findByPk(result.userId),
      text = `${req.body.username} has edited your post!`
      emailer(to,text)
      res.json(result)
    })
  );

  app.delete("/role/:id", (req, res) =>
    db.role.destroy({
      where: {
        id: req.params.id
      }
    }).then((result) => res.json(result))
  );
}