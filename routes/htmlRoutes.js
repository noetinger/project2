var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Beer.findAll({}).then(function(beerList) {
      res.render("index", {
        msg: "Welcome to Crafty Drafter!",
        beers: beerList
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/beer/:type", function(req, res) {
    db.Beer.findOne({ where: { type: req.params.type } }).then(function(beerList) {
      res.render("index", {
        beers: beerList
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
