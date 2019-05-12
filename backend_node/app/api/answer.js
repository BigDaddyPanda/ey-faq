const emailer = require("../../tools/email");

module.exports = (app, db) => {
  app.get("/answers", (req, res) =>
    db.answer.findAll().then((result) => res.json(result))
  );

  app.get("/answer/:id", (req, res) =>
    db.answer.findById(req.params.id).then((result) => res.json(result))
  );

  app.post("/answer", (req, res) =>
    db.answer.create({
      title: req.body.title,
      content: req.body.content
    }).then((result) => {
      res.json(result)
    })
  );

  app.put("/answer/:id", (req, res) =>
    db.answer.update({
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
      text = `${req.body.username} has edited your answer!`
      emailer(to,text)
      res.json(result)
    })
  );

  app.delete("/answer/:id", (req, res) =>
    db.answer.destroy({
      where: {
        id: req.params.id
      }
    }).then((result) => res.json(result))
  );
}