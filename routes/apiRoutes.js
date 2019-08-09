var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/beers", function (req, res) {
    db.Beer.findAll({}).then(function (dbBeer) {
      console.log("Name of Beer!")
      res.json(dbBeer);
    });
  });

  //Get route for returning post of the specific type of beer//

  app.get("/api/type/:type", function (req, res) {
    return db.Beer.findAll({
      where: {
        type: req.params.type
      },
      raw: true
    }).then(function (dbBeer) {
      // console.log(dbBeer);
      
      return res.render('partials/search-results', {
        beers: dbBeer,
        layout: false,
      });
    })
  })



  //Get route to searching by Brewery Name//
  app.get("/api/breweryname/:breweryName", function (req, res) {
    return db.Beer.findAll({
      where: {
        breweryName: req.params.breweryName
      },
      raw: true
    }).then(function (dbBeer) {
      console.log("Name of Brewery is here!");
      // console.log(dbBeer);
      
      return res.render('partials/search-results', {
        beers: dbBeer,
        layout: false,
      });
    })

    app.get('beers', (req, res) => {
      res.render('some-handlebars.hbs')
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
  

  //Create a new example
  app.post("/api/beer", function (req, res) {
    db.Beer.create({
      beerName: req.body.beerName,
      breweryName: req.body.breweryName,
      addressOne: req.body.addressOne,
      addressTwo: req.body.addressTwo,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      type: req.body.type,
      abv: req.body.abv,
      where: req.body.where,
      when: req.body.when,
    }).then(function (dbBeer) {
      console.log(dbBeer);
      res.json(dbBeer);
    });
  });

  //Get route for returning articles
  app.get("/api/articles", function (req, res) {
    return db.Articles.findAll({

    }).then(function (dbArticles) {

      return res.render('partials/articles', {
        Articles: dbArticles,
        layout: false,
      });
    })
  })
  
};