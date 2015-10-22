var activity = {};

// for ajax
activity.url = "https://api.foursquare.com/v2/venues/explore";
activity.client = "LXPSZXFCGFE1VMU33P4CYHFZXNLZDA3GIPM05SJI2AS1W20H";
activity.secret = "PDZOVDI2YNL1IJ1NLSPZ0MJ3VXFTHY2DDF0LMWN2HC01FENV";
activity.version = "2013081520";
activity.access = "pk.eyJ1IjoiY2FyeXMiLCJhIjoiY2lmcnA0bDAxMG1yNHMybTB4cDFkMnEzMyJ9.4Z26iDuKWwLy8qs1MyTkDg";


//initial ajax call
activity.getChoice = function(userChoice) {
  $.ajax({
    url: activity.url,
    method: 'GET',
    dataType: 'jsonp',
    data : {
    	client_id: activity.client,
    	client_secret: activity.secret,
    	near: "toronto",
    	query: userChoice,
    	v: activity.version 
    }
  }).then(function(res) {
      activity.displayResults(res.response.groups[0].items); //to get within the array info that we need. could move elsewhere
      activity.plotMap();
  });
};

// display the activities
activity.displayResults = function(venues){
  $.each(venues, function(i, value) {
    console.log(value);
    var name = $("<h2>").text(value.venue.name);
    var location = $("<h3>").text(value.location);
    var hours = $("<h3>").text(value.hours);
    var rating = $("<h3>").text(value.rating);
    var review = $("<p>").text(value.tips[0].text); // ***I think this error is because some don't have this, causes not to show
    var website = $("<a>").attr("href", value.venue.url);
    var container = $("<div>").append(name, location, hours, rating, review, website);
    $("#text").append(container);
  });
};

activity.getMap = function() {
  L.mapbox.accessToken = activity.access;
  activity.map = L.mapbox.map('map', 'carys.nn6p55nf')
      .setView([43.677, -79.436], 12);
};

activity.plotMap = function(){
  $.each(venues, function(i, value) {
      L.marker([value.venue.location.lat,value.venue.location.lng]).addTo(activity.map);
  });
};

// everything to run on doc ready
activity.init = function() {
  activity.getMap(); 
	activity.getChoice("bowling"),
  $("#activity").on("change", function() {
      var quirky = $(this).val();
      $("#text").empty();
      activity.getChoice(quirky);
  });
};

//document ready
$(function() {
	activity.init();
});
