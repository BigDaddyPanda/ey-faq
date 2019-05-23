const emailer = require("../../tools/email");

module.exports = (app, db) => {
  app.get("/answers", (req, res) =>
    db.answer.findAll().then((result) => res.json(result))
  );

  app.get("/answer/:id", (req, res) =>
    db.answer.findByPk(req.params.id).then((result) => res.json(result))
  );

  app.post("/answer", (req, res) => {
    let content = req.body.content,
      questionId = req.body.questionId,
      userId = req.body.userId;
    db.answer.create({
      content,
      questionId,
      userId
    }).then((result) => {
      res.json(result)
    })
  }
  );

  app.put("/answer/:id", async (req, res) => {
    let responsible = req.body.responsible;
    let ans = await db.answer.findByPk(req.params.id);
    await db.answer.update({ is_best: true }, { where: { id: ans.id } })
    db.question.update({
      /**
       * Other stuff to update
       */
      tag: "solved"

    }, {
        where: {
          id: ans.questionId
        }
      }).then(async (result) => {
        let to = await db.user.findByPk(result.userId),
          text = `${responsible.username} has marked your question solved,the solution: 
          >>> ${ans.content}`;
        emailer(to, text)
        res.json(result);
      })
  });

  app.delete("/answer/:id", (req, res) => {
    let responsible = req.body.responsible;

    db.answer.destroy({
      where: {
        id: req.params.id
      }
    }).then(async (result) => {
      let to = await db.user.findByPk(result.userId),
        text = `${responsible.username} has deleted your question!`
      emailer(to, text)
      res.json(result);
    })
  }
  );
}