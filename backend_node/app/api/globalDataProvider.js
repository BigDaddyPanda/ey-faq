module.exports = (app, db) => {
  app.get("/getInitialData", async function (req, res) {
    let returnData = {}
    await db.role.findAll().then((result) => returnData.roles = result)
    await db.service.findAll().then((result) => returnData.services = result)
    res.json(returnData)
  }
  );
}