require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
const puppeteer = require("puppeteer");
const fs = require("fs");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});



//Webscraping Code
(async () => {
  try {
    //open headless browser
    var browser = await puppeteer.launch({
      headless: true
    });
    //open a new page
    var page = await browser.newPage();
    //enter url in page
    await page.goto('https://www.craftbrewingbusiness.com/news/');
    await page.waitForSelector("a.entry-title-link");

    var artlices = await page.evaluate(() => {
      var titleNodeList = document.querySelectorAll('a.entry-title-link');

      // convert stupid NodeList -> Array 🤙 💯💯💯
      const articles = Array.from(titleNodeList)
        // map over the array to create a copy
        // each loop will take the node and return an object
        .map(function (node) {
          return {
            title: node.innerText.trim(),
            link: node.getAttribute('href')
          };
        });

      return articles;
    });
    await browser.close();

      db.Articles.bulkCreate(artlices)
      .then(function (dbArticles) {
        console.log('🗞️ Articles Created 🗞️')
      });

    console.log("Browser Closed!");
  } catch (err) {
    //Catch and display errors
    console.log(err);
    await browser.close();
    console.log("Browser Closed");
  }
})();

module.exports = app;
