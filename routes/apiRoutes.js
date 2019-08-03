var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/beers", function(req, res) {
    db.Beer.findAll({}).then(function(dbBeer) {
      console.log("Name of Beer!")
      res.json(dbBeer);
    });
  });

  //Get route for returning post of the specific type of beer//

  app.get("/api/type/:type", function (req, res) {

    db.Beer.findAll({
      where: {
        type: req.params.type
      }
    }).then(function (dbBeer) {

      res.json(dbBeer);
      console.log(dbBeer)
    })
  })



  //Get route to searching by Brewery Name//
  app.get("/api/breweryname/:breweryname", function (req, res) {
    db.Beer.findAll({
      where: {
        breweryName: req.params.breweryname
      }
    }).then(function (dbBeer) {
      console.log("Name of Brewery is here!");
      res.json(dbBeer);
    })
  })
  



  //Get route for returning post of the specific type of beer//
  app.get("/api/abv/:abv", function (req, res) {
    db.Beer.findAll({
      where: {
        abv: req.params.abv
      }
    }).then(function (dbBeer) {
      console.log("Percentage of beer is here!");
      res.json(dbBeer);
    })
  })
  

  // Create a new beer
  //app.post("/api/addbeer", function(req, res) {
  //db.Beer.create({(
  //beerName:req.body.beerName,

  //}).then(function());

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