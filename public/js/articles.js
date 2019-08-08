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