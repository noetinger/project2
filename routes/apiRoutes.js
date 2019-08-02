var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/beers", function(req, res) {
    db.Beer.findAll({}).then(function(dbBeer) {
      res.json(dbBeer);
    });
  });

  //Get route for returning post of the specific type of beer//
  app.get("/api/beer/type/:type", function(req,res){
    db.Beer.findAll({
      where: {
        type: req.params.type
      }
    })
  })
  .then(function(dbBeer){
    res.json(dbBeer);
  })


//Get route to searching by Brewery Name//
app.get("/api/beers/breweryName/:breweryName", function (req, res) {
    db.Beer.findAll({
      where: {
        breweryName: req.params.breweryName
      }
    })
  })
  .then(function (dbBeer) {
    res.json(dbBeer);
  })



//Get route for returning post of the specific type of beer//
app.get("/api/beers/abv/:abv", function (req, res) {
    db.Beer.findAll({
      where: {
        abv: req.params.abv
      }
    })
  })
  .then(function (dbBeer) {
    res.json(dbBeer);
  })

  // Create a new example
  //app.post("/api/beer", function(req, res) {
    //db.Beer.create(req.body).then(function(dbBeer) {
      //res.json(dbBeer);
   // });
  //});

  // Delete an example by id
  //app.delete("/api/examples/:id", function(req, res) {
    //db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      //res.json(dbExample);
   // });
  //});
};
