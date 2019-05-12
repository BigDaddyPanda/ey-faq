const emailer = require("../../tools/email");

module.exports = (app, db) => {
  app.get("/questions", (req, res) =>
    db.question.findAll().then((result) => res.json(result))
  );

  app.get("/question/:id", (req, res) =>
    db.question.findById(req.params.id).then((result) => res.json(result))
  );

  app.post("/question", (req, res) =>
    db.question.create({
      title: req.body.title,
      content: req.body.content
    }).then((result) => {
      res.json(result)
    })
  );

  app.put("/question/:id", (req, res) =>
    db.question.update({
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
      text = `${req.body.username} has edited your question!`
      emailer(to,text)
      res.json(result)
    })
  );

  app.delete("/question/:id", (req, res) =>
    db.question.destroy({
      where: {
        id: req.params.id
      }
    }).then((result) => res.json(result))
  );
}