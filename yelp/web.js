// web.js
var express = require("express");

var yelp = require("yelp").createClient({
  consumer_key: "i4BTXV8QHlYnF3wix3RpNQ", 
  consumer_secret: "GNJKE0OY_-kxinadjbKPWuIXrmI",
  token: "Ko28Ao7Lv_OQ5CpZLRVgUwYnAczwZXOX",
  token_secret: "Kh3orDgawuUoeWVR1RlZ-mhehNk",
});

var app = express();

var businesses = new Array();

app.get('/', function(req, res) {
    
    // See http://www.yelp.com/developers/documentation/v2/search_api
    yelp.search({term: "restaurants", location: "San Francisco"}, function(error, data) {
        console.log(error);
        console.log(data);
        
//        for(var i = 0; i < data.businesses.length; i++) {
//            // See http://www.yelp.com/developers/documentation/v2/business
//            yelp.business(data.businesses[i].id, function(error, data) {
//                console.log(error);
//                console.log(data);
//                
//                businesses.push(data);
//            });
//        }
        
        res.json({error: error, data: data});
    });
    
});

app.get('/businesses', function(req, res) {
    res.json({businesses: businesses});
});

app.get('/business/:id', function(req, res) {
    
    console.log(req.params.id)
    
    yelp.business(req.params.id, function(error, data) {
        console.log(error);
        console.log(data);

        res.json({error: error, data: data});
    });
});

var port = Number(process.env.PORT || 5051);

app.listen(port, function() {
  console.log("Listening on " + port);
});