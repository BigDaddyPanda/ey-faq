const emailer = require("../../tools/email");

module.exports = (app, db) => {
  app.get("/comments", (req, res) =>
    db.comment.findAll().then((result) => res.json(result))
  );

  app.get("/comment/:id", (req, res) =>
    db.comment.findByPk(req.params.id).then((result) => res.json(result))
  );

  app.post("/comment", (req, res) => {
    let content = req.body.content,
      postId = req.body.postId,
      userId = req.body.userId;
    db.comment.create({
      content,
      postId,
      userId
    }).then((result) => {
      res.json(result)
    })
  }
  );

  app.put("/comment/:id", async (req, res) => {
    let responsible = req.body.responsible;
    let ans = await db.comment.findByPk(req.params.id);
    await db.comment.update({ is_best: true }, { where: { id: ans.id } })
    db.post.update({
      /**
       * Other stuff to update
       */
      tag: "solved"

    }, {
        where: {
          id: ans.postId
        }
      }).then(async (result) => {
        let to = await db.user.findByPk(result.userId),
          text = `${responsible.username} has marked your post solved,the solution: 
          >>> ${ans.content}`;
        emailer(to, text)
        res.json(result);
      })
  });

  app.post("/delcomment/:id", (req, res) => {
    let responsible = req.body.responsible;

    db.comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(async (result) => {
      let to = await db.user.findByPk(result.userId),
        text = `${responsible.username} has deleted your Comment on!`
      emailer(to, text)
      res.json(result);
    })
  }
  );
}