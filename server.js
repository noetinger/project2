require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
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

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});



//Webscraping Code

const puppeteer = require("puppeteer");
const fs = require("fs");

(async() => {
    try{
        //open headless browser
        var browser = await puppeteer.launch({ headless: false});
        //open a new page
        var page = await browser.newPage();
        //enter url in page
        await page.goto('https://www.craftbrewingbusiness.com/news/');
        await page.waitForSelector("a.entry-title-link");

        var news = await page.evaluate(() => {
            var titleNodeList = document.querySelectorAll('a.entry-title-link');
            var titleLinkArray = [];
            for (var i = 0; i < 5; i++){
                titleLinkArray[i] = {
                    title: titleNodeList[i].innerText.trim(),
                    link: titleNodeList[i].getAttribute("href")
                };
            }
            return titleLinkArray
        });
        await browser.close();

        fs.writeFile("beernews.json", JSON.stringify(news), function(err){
            if (err) throw err;
            console.log("Saved!");
        });
        console.log("Browser Closed!");
    } catch (err){
        //Catch and display errors
        console.log(err);
        await browser.close();
        console.log("Browser Closed");
    }
})();

module.exports = app;


//Titles and Link
fs.readFile('/beernews.json', (err, data) => {
  if (err) throw err;
  let articles = JSON.parse(data)

  console.log('article info' + articles);
});