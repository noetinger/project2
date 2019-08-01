var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Beer.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/api/examples/type/:type", function(req,res){
    db.Beer.findAll({
      where: {
        beerName:
      }
    })
  })
  .then(function(dbBeer){
    res.json(dbBeer);
  })
  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbBeer);
    });
  });

  // Delete an example by id
  //app.delete("/api/examples/:id", function(req, res) {
    //db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      //res.json(dbExample);
   // });
  //});
};
