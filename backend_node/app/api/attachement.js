const emailer = require("../../tools/email");

module.exports = (app, db) => {
  app.get("/attachements", (req, res) =>
    db.attachement.findAll().then((result) => res.json(result))
  );

  app.get("/attachement/:id", (req, res) =>
    db.attachement.findByPk(req.params.id).then((result) => res.json(result))
  );

  app.post("/attachement", (req, res) =>
    db.attachement.create({
      title: req.body.title,
      content: req.body.content
    }).then((result) => {
      res.json(result)
    })
  );

  app.put("/attachement/:id", (req, res) =>
    db.attachement.update({
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

  app.delete("/attachement/:id", (req, res) =>
    db.attachement.destroy({
      where: {
        id: req.params.id
      }
    }).then((result) => res.json(result))
  );
}