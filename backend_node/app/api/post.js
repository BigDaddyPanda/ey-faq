const emailer = require("../../tools/email");

module.exports = (app, db) => {
  app.get("/posts", (req, res) =>
    db.post.findAll({
      include: [{
        model: db.service,
        attributes: ["designation"]
      }]
    }).then((result) => res.json(result))
  );

  app.get("/post/:id", (req, res) =>
    db.post.findByPk(req.params.id).then((result) => res.json(result))
  );

  app.post("/post", (req, res) =>
    db.post.create({
      title: req.body.title,
      content: req.body.content
    }).then((result) => {
      res.json(result)
    })
  );

  app.put("/post/:id", (req, res) =>
    db.post.update({
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
        emailer(to, text)
        res.json(result)
      })
  );

  app.delete("/post/:id", (req, res) =>
    db.post.destroy({
      where: {
        id: req.params.id
      }
    }).then((result) => res.json(result))
  );
}