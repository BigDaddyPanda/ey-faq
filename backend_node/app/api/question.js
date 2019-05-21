const emailer = require("../../tools/email");
const sequelize = require('sequelize');
module.exports = (app, db) => {
  app.get("/questions", (req, res) =>
    db.question.findAll({ include: [{ all: true }] }).then((result) => res.json(result))
  );
  app.get("/faquestions", (req, res) =>
    db.question.findAll({
      include: [{ all: true },
      {
        model: db.answer,
        include: [{ all: true }]
      }]
    }).then((result) => res.json(result.slice(0, 5)))
       );

  app.get("/question/:id", (req, res) =>
    db.question.findByPk(req.params.id, { include: [{ all: true }] }).then((result) => res.json(result))
  );

  app.post("/question", (req, res) =>
    db.question.create({
      title: req.body.title,
      content: req.body.content
    }).then((result) => {
      res.json(result)
    })
  );

  app.put("/question/:id", (req, res) => {
    db.question.update({
      /**
       * Other stuff to update
       */
      tag: req.body.newTag,
      serviceId: req.body.newService,
      editor: req.body.editor.username
    }, {
        where: {
          id: req.params.id
        }
      }).then((result) => {
        let to = req.body.editor.email;
        let modificationtext = req.body.modificationtext,
          text = `${req.body.username} has edited your question!\nHe claims that:\n${modificationtext}`
        emailer(to, text);
        res.json(result)
      })
  }
  );

  // app.delete
  app.put("/delquestion/:id", (req, res) => {
    console.log(req.params);
    console.log(req.body.deletereason);
    let to = "ky94@live.com";
    // let to = req.body.target.user.email;
    let delext = req.body.deletereason,
      text = `${req.body.admin.user.username} has deleted your question!\nHe claims that:\n${delext}`
    emailer(to, text);
    db.question.destroy({
      where: {
        id: req.params.id
      }
    }).then((result) => res.json(result))
  });
}