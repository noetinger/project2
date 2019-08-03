var db = require("../models");

module.exports = function (app) {
  // Get all examples
<<<<<<< HEAD
  app.get("/api/beers", function(req, res) {
    db.Beer.findAll({}).then(function(dbBeer) {
      console.log("Name of Beer!")
=======
  app.get("/api/beers", function (req, res) {
    db.Beer.findAll({}).then(function (dbBeer) {
>>>>>>> fbdabac2cac6a1be6327315c4fb22c95a9a7b74c
      res.json(dbBeer);
    });
  });

  //Get route for returning post of the specific type of beer//

  app.get("/api/beer/type/:type", function (req, res) {

    db.Beer.findAll({
      where: {
        type: req.params.type
      }
    }).then(function (dbBeer) {
      res.json(dbBeer);
    })
  })

  .then(function(dbBeer){
  console.log("beer type is here");
    res.json(dbBeer);
  })


  //Get route to searching by Brewery Name//
  app.get("/api/beers/breweryName/:breweryName", function (req, res) {
    db.Beer.findAll({
      where: {
        breweryName: req.params.breweryName
      }
    }).then(function (dbBeer) {
      res.json(dbBeer);
    })
  })
<<<<<<< HEAD
  .then(function (dbBeer) {
    console.log("Brewery Name is here")
    res.json(dbBeer);
  })
=======
>>>>>>> fbdabac2cac6a1be6327315c4fb22c95a9a7b74c




  //Get route for returning post of the specific type of beer//
  app.get("/api/beers/abv/:abv", function (req, res) {
    db.Beer.findAll({
      where: {
        abv: req.params.abv
      }
    }).then(function (dbBeer) {
      res.json(dbBeer);
    })
  })
<<<<<<< HEAD
  .then(function (dbBeer) {
    console.log("Percentage is here")
    res.json(dbBeer);
  })
=======

>>>>>>> fbdabac2cac6a1be6327315c4fb22c95a9a7b74c

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