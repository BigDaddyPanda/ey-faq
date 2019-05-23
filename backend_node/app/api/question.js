const emailer = require("../../tools/email");
const sequelize = require('sequelize');
module.exports = (app, db) => {
  app.get("/questions", (req, res) =>
    db.question.findAll({
      include: [{ all: true }],
      where: {
        ispublic: true
      }
    }).then((result) => res.json(result))
  );
  app.get("/faquestions", (req, res) =>
    db.question.findAll({
      include: [{ all: true },
      {
        model: db.answer,
        include: [{ all: true }]
      }],
      where: {
        ispublic: true
      }
    }).then((result) => res.json(result.slice(0, 5)))
  );
  app.get("/myquestions", (req, res) => {
    let user = req.query.user;
    console.log(user);

    db.user.scope("withoutCredentials").findOne({ where: { email: user } }).then(p => db.question.findAll({
      include: [{ all: true },
      {
        model: db.answer,
        include: [{ all: true }]
      }],
      where: {
        userId: p.id
      }
    }).then((result) => res.json(result)))
  }
  );

  app.get("/question/:id", (req, res) =>
    db.question.findByPk(req.params.id, { include: [{ all: true }] }).then((result) => res.json(result))
  );

  app.post("/question", async (req, res) => {
    let new_question = req.body.new_question,
      user = req.body.user;
    // console.log("user",user,"new_question",new_question);

    db.user.scope("withoutCredentials").findOne({ where: { email: user.user.email } }).then(p => db.question.create({
      title: new_question.title,
      description: new_question.description,
      content: new_question.content,
      ispublic: new_question.ispublic,
      serviceId: new_question.serviceId,
      userId: p.id
    }).then(async (result) => {
      if (new_question.attachements != []) {
        for (let i = 0; i < new_question.attachements.length; i++) {
          new_question.attachements[i].questionId = result.id;
        }
        await db.attachement.bulkCreate(new_question.attachements)
      }
      res.json({ ok: true, id: result.id })
    }))
  }
  );

  app.put("/question/:id", (req, res) => {
    db.question.update({
      /**
       * Other stuff to update
       */
      title: req.body.title,
      description: req.body.description,
      serviceId: req.body.serviceId,
      content: req.body.content,
      edited: true,
      editedBy: req.body.editor.user.username
    }, {
        where: {
          id: req.params.id
        }
        // }).then((result) => {
        //   // result.setAttachements(req.body.attachements);
        //   return result
      }).then((result) => {
        console.log("resss");
        let to = "ky94@live.com";
        // let to = result.user.email;
        let modificationtext = req.body.modificationtext,
          text = `${req.body.editor.user.username}/${req.body.editor.user.email} has edited your question!
          <br/>Modification Content: <br/>${modificationtext}
          <br/> <a href="${process.env.localhost}#/questions/${req.params.id}">Link to the question here</a>`
        emailer(to, text);
        res.json(result)
      })
  }
  );

  // app.delete
  app.put("/delquestion/:id", (req, res) => {
    console.log(req.params);
    console.log(req.body.deletereason);
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