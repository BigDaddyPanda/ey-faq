const emailer = require("../../tools/email");
const sequelize = require('sequelize');
module.exports = (app, db) => {
  app.get("/posts", (req, res) =>
    db.post.findAll({ include: [{ all: true }] }).then((result) => res.json(result))
  );
  app.get("/faposts", (req, res) =>
    db.post.findAll({ include: [{ all: true }, { model: db.comment, include: [{ all: true }] }] }).then((result) => res.json(result.slice(0, 5)))
    // db.post.findAll({
    //   include: [{ all: true }],
    //   // attributes: [[sequelize.fn('COUNT', 'comment.id'), 'count_comments']],
    // }).then(resu => {
    //   return resu.reduce(function (p, v) {
    //     v.comments = (v.comments.length);
    //     console.log(v.comments.length)
    //     p.push(v);
    //     return p
    //   }, [])
    // }).then(r=>res.json(r))
  );

  app.get("/post/:id", (req, res) =>
    db.post.findByPk(req.params.id, { include: [{ all: true }] }).then((result) => res.json(result))
  );

  app.post("/post", (req, res) =>
    db.post.create({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      serviceId: Number(req.body.serviceId) || 1,
      userId: Number(req.body.userId) || 1
    }).then((result) => {
      res.json(result)
    })
  );

  app.put("/post/:id", (req, res) => {
    db.post.update({
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
          text = `${req.body.username} has edited your post!\nHe claims that:\n${modificationtext}`
        emailer(to, text);
        res.json(result)
      })
  }
  );

  // app.delete
  app.put("/delpost/:id", (req, res) => {
    console.log(req.params);
    console.log(req.body.deletereason); 
    // let to = req.body.target.user.email;
    let delext = req.body.deletereason,
      text = `${req.body.admin.user.username} has deleted your post!\nHe claims that:\n${delext}`
    emailer(to, text);
    db.post.destroy({
      where: {
        id: req.params.id
      }
    }).then((result) => res.json(result))
  });
}