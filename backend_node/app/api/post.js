const emailer = require("../../tools/email");
const sequelize = require('sequelize');
module.exports = (app, db) => {
  app.get("/posts", (req, res) =>
    db.post.findAll({
      include: [{ all: true }]
    }).then((result) => res.json(result))
  );
  app.get("/faposts", (req, res) =>
    db.post.findAll({
      include: [{ all: true },
      {
        model: db.comment,
        include: [{ all: true }]
      }],
      limit: 10,
      order: [['updatedAt', 'DESC'],['visited', 'DESC']]
    }).then((result) => res.json(result))
  );
  app.get("/myposts", (req, res) => {
    let user = req.query.user;
    console.log(user);

    db.user.scope("withoutCredentials").findOne({ where: { email: user } }).then(p => db.post.findAll({
      include: [{ all: true },
      {
        model: db.comment,
        include: [{ all: true }]
      }],
      where: {
        userId: p.id
      }
    }).then((result) => res.json(result)))
  }
  );

  app.get("/post/:id", async (req, res) => {
    await db.post.update({
      visited: sequelize.literal('visited + 1')
    }, {
        where: {
          id: req.params.id
        }
      })
    db.post.findByPk(req.params.id, { include: [{ all: true }] }).then((result) => res.json(result))
  }
  );

  app.post("/post", async (req, res) => {
    let new_post = req.body.new_post,
      user = req.body.user;
    // console.log("user",user,"new_post",new_post);

    db.user.scope("withoutCredentials").findOne({ where: { email: user.user.email } }).then(p => db.post.create({
      title: new_post.title,
      description: new_post.description,
      content: new_post.content,
      ispublic: new_post.ispublic,
      serviceId: new_post.serviceId,
      userId: p.id
    }).then(async (result) => {
      if (new_post.attachements != []) {
        for (let i = 0; i < new_post.attachements.length; i++) {
          new_post.attachements[i].postId = result.id;
        }
        await db.attachement.bulkCreate(new_post.attachements)
      }
      res.json({ ok: true, id: result.id })
    }))
  }
  );

  app.put("/post/:id", (req, res) => {
    db.post.update({
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
        // console.log("resss");
        // let to = "ky94@live.com";
        let to = req.body.editor.user.email;
        let modificationtext = req.body.modificationtext,
          text = `${req.body.editor.user.username}/${req.body.editor.user.email} has edited your post!
          <br/>Modification Content: <br/>${modificationtext}
          <br/> <a href="${process.env.localhost}#/posts/${req.params.id}">Link to the post here</a>`
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