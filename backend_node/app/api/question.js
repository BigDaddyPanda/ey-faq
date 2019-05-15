const emailer = require("../../tools/email");
const sequelize = require('sequelize');
module.exports = (app, db) => {
  app.get("/questions", (req, res) =>
    db.question.findAll({ include: [{ all: true }] }).then((result) => res.json(result))
  );
  app.get("/faquestions", (req, res) =>
    db.question.findAll({ include: [{ all: true }] }).then((result) => res.json(result.slice(0,5)))
    // db.question.findAll({
    //   include: [{ all: true }],
    //   // attributes: [[sequelize.fn('COUNT', 'answer.id'), 'count_answers']],
    // }).then(resu => {
    //   return resu.reduce(function (p, v) {
    //     v.comments = (v.comments.length);
    //     console.log(v.comments.length)
    //     p.push(v);
    //     return p
    //   }, [])
    // }).then(r=>res.json(r))
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
      content: req.body.content
    }, {
        where: {
          id: req.params.id
        }
      }).then((result) => {
        let to = db.user.findByPk(result.userId),
          text = `${req.body.username} has edited your question!`
        emailer(to, text)
        res.json(result)
      })
  }
  );

  app.delete("/question/:id", (req, res) =>
    db.question.destroy({
      where: {
        id: req.params.id
      }
    }).then((result) => res.json(result))
  );
}