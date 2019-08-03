// Get references to page elements
//buttons
var $searchBtn = $("#searchBtn");
var $newBeerbtn = $("#newBeerbtn");
var $returnPage = $("#returnPage")

var $newBeer = $("#newBeer");
var $newBrewery = $("#newBrewery");
var $addressOne = $("#newAddy1");
var $addressTwo = $("#newAddy2");
var $city = $("#newcity");
var $newState = $("#newState");
var $newZip = $("#newZip");
var $newType = $("#newType");
var $newAbv = $("#newAbv");
var $where = $("#newWhere");
var $when = ("#newWhen");


// The API object contains methods for each kind of request we'll make
var API = {
  addBeer: function(newBeer) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/beer",
      data: JSON.stringify(newBeer)
    });
  },
  getBeer: function(searchedBeer) {
    return $.ajax({
      url: "/api/type/"+searchedBeer,
      type: "GET"
    });
  },

};


// handleFormSubmit is called whenever we submit a new beer
// Save the new beer to the db and refresh the page
var handleFormSubmit = function(event) {
  event.preventDefault();

  var newBeer = {
    beerName: $newBeer.val().trim(),
    breweryName: $newBrewery.val().trim(),
    addressOne: $newAddy1.val().trim(),
    addressTwo: $newAddy2.val().trim(),
    city: $newcity.val().trim(),
    state: $newState.val().trim(),
    zip: $newZip.val().trim(),
    type: $newType.val().trim(),
    abv: $newAbv.val().trim(),
    where: $newWhere.val().trim(),
    when: $newWhen.val().trim(),
  };
  console.log("in handleFormSubmit function");
  console.log("new beer information: "+newBeer)

  if (!(newBeer.beerName && newBeer.breweryName && newBeer.addressOne && newBeer.city 
  && newBeer.state && newBeer.zip && newBeer.type && newBeer.abv && newBeer.where && newBeer.when)) {
    alert("You must enter all fields to add a new beer!");
    return;
  }

  API.addBeer(newBeer).then(function() {
    alert("Thank you for adding to the Craft Beers list! It is now available for future searches.");
    //reload the page
    location.reload();
  });

  $newBeer.val("");
  $newBrewery.val("");
  $addressOne.val("");
  $addressTwo.val("");
  $city.val("");
  $newState.val("");
  $newZip.val("");
  $newType.val("");
  $newAbv.val("");
  $where.val("");
  $when.val("");

};

var searchBeer = function() {
  event.preventDefault();
  searchedBeer = $('#searchTerm').val().trim();
  console.log("In searchBeer function");
  console.log(searchedBeer);
  API.getBeer(searchedBeer).then(function() {
    function displayBeers(result){
      var html = "<h1>Results</h1>";

      html += "<ul>";

      for (var i = 0; i < result.length; i++) {
        html += "<li><p> Name: " + result[i].beerName + "</p>";
        html += "<p> Brewery: " + result[i].breweryName + "</p>";
        html += "<p>" + result[i].addressOne + "</p>";
        html += "<p>" + result[i].addressTwo + "</p>";
        html += "<p>" + result[i].city + "</p>";
        html += "<p>" + result[i].state + "</p>";
        html += "<p>" + result[i].zip + "</p>";
        html += "<p> Type: " + result[i].type + "</p>";
        html += "<p> ABV: " + result[i].abv + "</p>";
        html += "<p> Where to purchase: " + result[i].where + "</p>";
        html += "<p> When is it available: " + result[i].when + "</p></li>";
      }

      html += "</ul>";

      res.send(html);
    }
    displayBeers();
      
  });

  // searchTermBox.val("");
  $returnPage.show;

}

function reload(){
  location.reload(); 
  $returnPage.hide; 
}

// Add event listeners to the search and add beer buttons
$newBeerbtn.on("click", handleFormSubmit);
$searchBtn.on("click", searchBeer);
$returnPage.on("click", reload);


