var quirky = {};

// for ajax
quirky.url = "https://api.foursquare.com/v2/venues/explore";
quirky.client = "LXPSZXFCGFE1VMU33P4CYHFZXNLZDA3GIPM05SJI2AS1W20H";
quirky.secret = "PDZOVDI2YNL1IJ1NLSPZ0MJ3VXFTHY2DDF0LMWN2HC01FENV";
quirky.version = "2013081520";

//other global variables >> just testing before we put html dropdown in. HTML values will be linked like art app example
quirky.choice = "axe_throw";
quirky.choise2 = "bowling";

//initial ajax call
quirky.getChoice = function(){
$.ajax({
  url: quirky.url,
  method: 'GET',
  dataType: 'jsonp',
  data : {
  	client_id: quirky.client,
  	client_secret: quirky.secret,
  	near: "toronto",
  	query: quirky.choice,
  	v: quirky.version //version number required by API
  }
}).then(function(res) {
    console.log(res.response.groups[0].items); //to get within the array info that we need. could move elsewhere
});
};

//everything to run on doc ready
quirky.init = function(){
	quirky.getChoice(quirky.choice);
};

//document ready
$(function() {
	quirky.init();
});
