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

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};