const emailer = require("../../tools/email");

module.exports = (app, db) => {
  app.get("/comments", (req, res) =>
    db.comment.findAll().then((result) => res.json(result))
  );

  app.get("/comment/:id", (req, res) =>
    db.comment.findById(req.params.id).then((result) => res.json(result))
  );

  app.post("/comment", (req, res) =>
    db.comment.create({
      title: req.body.title,
      content: req.body.content
    }).then((result) => {
      res.json(result)
    })
  );

  app.put("/comment/:id", (req, res) =>
    db.comment.update({
      /**
       * Other stuff to update
       */
      content: req.body.content
    }, {
      where: {
        id: req.params.id
      }
    }).then((result) => {
      let to = db.user.findById(result.userId),
      text = `${req.body.username} has edited your comment!`
      emailer(to,text)
      res.json(result)
    })
  );

  app.delete("/comment/:id", (req, res) =>
    db.comment.destroy({
      where: {
        id: req.params.id
      }
    }).then((result) => res.json(result))
  );
}