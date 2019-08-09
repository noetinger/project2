var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    Promise.all([
      db.Beer.findAll({}),
      db.Articles.findAll({
        offset: ((1-1)*5),
        limit: 5,
        subQuery: false
      })
    ]).then(function (results){
      console.log(results[1]);
      res.render("index", {
        beers: results[0],
        articles: results[1]
      });
    })
  });

  // // Load example page and pass in an example by id
  // app.get("/beer/:type", function(req, res) {
  //   db.Beer.findOne({ where: { type: req.params.type } }).then(function(beerList) {
  //     res.render("index", {
  //       beers: beerList
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};