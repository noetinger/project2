// Get references to page elements
//buttons
var $searchBtn = $("#searchBtn");
var $newBeerbtn = $("#newBeerbtn");
var $returnPage = $("#returnPage");
//variables for type of search specifics
var beerTypeSelection; 
var breweryTypeSelection;

// The API object contains methods for each kind of request we'll make
var API = {
  addBeer: function (newBeer) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/beer",
      data: JSON.stringify(newBeer)
    });
  },
  getBeer: function (searchedBeer) {
    return $.ajax({
      url: "/api/type/" + searchedBeer,
      type: "GET"
    });
  },
  getBrewery: function (searchedBeer) {
    return $.ajax({
      url: "/api/breweryname/" + searchedBeer,
      type: "GET"
    });
  },
};


// handleFormSubmit is called whenever we submit a new beer
// Save the new beer to the db and refresh the page
var handleFormSubmit = function (event) {
  event.preventDefault();

  var newBeer = $("#newBeer").val().trim();
  var newBrewery = $("#newBrewery").val().trim();
  var addressOne = $("#newAddy1").val().trim();
  var addressTwo = $("#newAddy2").val().trim();
  var newCity = $("#newcity").val().trim();
  var newState = $("#newState").val().trim();
  var newZip = $("#newZip").val().trim();
  var newType = $("#newType").val().trim();
  var newAbv = $("#newAbv").val().trim();
  var newWhere = $("#newWhere").val().trim();
  var newWhen = $("#newWhen").val().trim();


  var newBeer = {
    beerName: newBeer,
    breweryName: newBrewery,
    addressOne: addressOne,
    addressTwo: addressTwo,
    city: newCity,
    state: newState,
    zip: newZip,
    type: newType,
    abv: newAbv,
    where: newWhere,
    when: newWhen,
  };

  console.log("in handleFormSubmit function");
  console.log("new beer information: " + JSON.stringify(newBeer));
  alert("Thank you for adding to the Craft Beers list! It is now available for future searches.");

  API.addBeer(newBeer).then(function () {
    //reload the page
    location.reload();
  });

  $("#newBeer").val('');
  $("#newBrewery").val("");
  $("#addressOne").val("");
  $("#addressTwo").val("");
  $("#city").val("");
  $("#newState").val("");
  $("#newZip").val("");
  $("#newType").val("");
  $("#newAbv").val('');
  $("#where").val("");
  $("#when").val("");
  $("#newBeerbtn").prop("disabled", true);

};

var searchBeer = function () {
  event.preventDefault();
  console.log("in searchBeer function");
  var typeOfSearch = $("#typeofSearch").val();
  // var searchSpecific;
  if (typeOfSearch === "type") {

    beerTypeSelection = $("#typeSelections").val();

    API.getBeer(beerTypeSelection)
      .then(function(result) {
        console.log("92 " + typeOfSearch);
        console.log("93 " + beerTypeSelection);
        displayBeers(result);
      });
    $returnPage.show;

  } else if (typeOfSearch === "breweryName") {

    breweryTypeSelection = $("#brewerySelections").val();

    API.getBrewery(breweryTypeSelection)
      .then(function(result) {
        console.log("92 " + typeOfSearch);
        console.log("93 " + breweryTypeSelection);
        displayBeers(result);
      });
    $returnPage.show;
  }
}

function displayBeers(result) {
  $("#searchResults-list").css("display", "block");
  $('.searh-results-partial').html(result);
}


function reload() {
  location.reload();
  $returnPage.hide;
}


$("#typeofSearch").change(function () {
  var selected = $("#typeofSearch");
  console.log("selected: " + JSON.stringify(selected.val()));
  if ((selected.val()) === "type") {
    $("#typeSelections").css("display", "block");
    $("#brewerySelections").css("display", "none");
    $("#searchBtn").prop("disabled", false);
  } else if ((selected.val()) === "breweryName") {
    $("#brewerySelections").css("display", "block");
    $("#typeSelections").css("display", "none");
    $("#searchBtn").prop("disabled", false);
  } else {
    $("#typeSelections").css("display", "none");
    $("#brewerySelections").css("display", "none");
    $("#searchBtn").prop("disabled", true);
  }
});

$("#addBeerForm").change(function () {
  console.log("in addBeerForm.change() - checking for complete form");
  if ((!($("#newBeer").val() === "") &&
      !($("#newBrewery").val() === "") &&
      !($("#newType").val() === "") &&
      !($("#newABV").val() === "") &&
      !($("#newAddy1").val() === "") &&
      !($("#newcity").val() === "") &&
      !($("#newState").val() === "") &&
      !($("#newZip").val() === "") &&
      !($("#newWhen").val() === "") &&
      !($("#newWhere").val() === ""))) {
    $("#newBeerbtn").prop("disabled", false)
  }
});

// Add event listeners to the search and add beer buttons
$newBeerbtn.on("click", handleFormSubmit);
$searchBtn.on("click", searchBeer);
$returnPage.on("click", reload);


//Titles and Link
const fs = require('fs');

fs.readFile('beernews.json', (err, data) => {
    if (err) throw err;
    let articles = {
      for (var i=0; i<data.length; i++) {
        articleTitle: data[i].title,
        articleLink: data[i].link
      }     
    }
    console.log('article info' + JSON.parse(articles));
});