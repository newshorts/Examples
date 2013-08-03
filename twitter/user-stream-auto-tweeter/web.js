/*
 *  TODO: don't make a new connection, once the process is running, just let 
 *  the connection stand unless we get disconnected, then reconnect
 *
 **/

var _ENV = 'debug';

// so wtf

var express = require('express'),
    twitter = require('ntwitter');
    
if(_ENV == 'production') {
    // doritos info
    var twit = new twitter({
      consumer_key: 'pV5TYAizXn8XtOIka2xrg',
      consumer_secret: 'Wv4Qn7T3ssE1QbO97iPl3XVte5tD120FyMuoj7lWVWE',
      access_token_key: '31143489-oxODJtWqPkvjU96cUNx3ppOrM6N3mWmsuGAHjlckD',
      access_token_secret: 'CZ52h04Oq5blLgh5BtERwC6TZgh0M7Xuo86rgNisSv4'
    });
} else {
    // beta
    var twit = new twitter({
      consumer_key: 'q9lDW7wsXvz6dtI5Rju5Xw',
      consumer_secret: 'lVrIl9qIgdEYVWW6E1FlkTh0INTYnwsfTCgZA79U4',
      access_token_key: '1278948026-ovJDjB2ASahGTkA4yqHec7eyvnirLJInBl5KGd7',
      access_token_secret: 'AGL1ct5ZOY6Gkwpiuy6gruikl6eTu7ww1u4OAjmtlE'
    });
}

var _stream;

var app = express.createServer(express.logger());

var hashtag;

if(_ENV == 'production') {
    hashtag = 'BoldStage';
} else {
    hashtag = 'omglolmikenewell';
}

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Listening on " + port);
});

var searchTwitter = function() {
    
    console.log('hashtag: ' + hashtag)
    
    twit.search('#' + hashtag, {}, function(err, data) {
        console.log(data);
    });
};

var isCannedTweet = function(text) {
//    var stringSegments = [
//        "Get ready for the boldest gigs at SXSW",
//        "Click for a recap of the 2012 event",
//        "You asked for a sneak peek"
//    ];

    var stringSegments = [
        "Get ready for the boldest gigs at SXSW",
        "This replay contains pool parties",
        "you like 62-foot vending machines and pyro",
        "the most interactive stage at",
        "So you wanted highlights",
        "what happened when 14,000 tweets controlled a 62-foot vending machine",
        "functional vending machine powered by fans",
        "How bold did the fans make it"
    ];
    
    var result = false;
    
    for(var i = 0; i < stringSegments.length; i++) {
        if(text.indexOf(stringSegments[i]) > -1) {
            console.log('return from the canned string search:' + text.search(stringSegments[i]));
            result = true;
        }
    }
    
    return result;
}

var streamHashtag = function() {
    
    var tb = tweetBack;
    
    var isCanned = isCannedTweet;
    
    console.log('hashtag: ' + hashtag)
    
    twit.stream('statuses/filter', {'track':hashtag}, function(stream) {
        
        _stream = stream;
        
        stream.on('data', function (data) {
            if(typeof data.disconnect != "undefined") {
                
                console.log("we're disconnected so I dont think we can do this right now.")
                
            } else {
                
                var canned = isCanned(data.text);
                
                console.log('canned is set to:' + canned);
                
                if(!canned) {
                    console.log('not a canned message')
                    console.log('twitter text: "' + data.text + '"')
                    console.log('id_str: "' + data.id_str + '"')
                    tb(data.user.screen_name, data.text, data.id_str);
                } else {
                    console.log('The tweet was detected to be canned, dropping...');
                }
                
            }
        });
    });
};

var tweetBack = function(user, text, reply_id) {
    if(typeof user != "undefined") {
        
        setTimeout(function() {
            
            // can only use commas, question marks and periods
            // apostrophes must be changed to the ‘ character which you can make by opt+} keys
            // 
//            var promotionalMessages = [
//                "Get ready for the boldest gigs at SXSW. Click for a recap of the 2012 event. http://youtu.be/Y2SNTXr7jBM #" + hashtag,
//                "This year, we will be even bolder. Click for a recap of the 2012 event. http://youtu.be/Y2SNTXr7jBM #" + hashtag,
//                "You asked for a sneak peek? You got it. http://youtu.be/ERBjtE4VrTU #" + hashtag
//            ];

            // can only use colons, commas, apostrophes (check this), question marks and periods
            var promotionalMessages = [
                // over 140
//                "@"+user+"Get ready for the boldest gigs at SXSW: put your phone on top of Doritos #" + hashtag + " and push play http://youtu.be/MHtaGC832po",
                "@"+user+" This replay contains pool parties, pyrotechnics and tesla coils. Ready?  http://bit.ly/13HtBj5 #" + hashtag + " #SXSW2013",
                // over 140
//                "@"+user+"Awesome,  you like 62-foot vending machines and pyro. Here's a little more where that came from http://bit.ly/13HtBj5 #" + hashtag + " #SXSW2013",
                // over 140
//                "Hey @"+user+", thanks for asking. Here's what went down at #" + hashtag + ", the most interactive stage at #SXSW2013 http://bit.ly/13HtBj5",
                "@"+user+" So you wanted highlights. How about 62-foot hight and pyro? http://bit.ly/13HtBj5 #" + hashtag + " #SXSW2013",
                // over 140
//                "@"+user+"OK, here's what happened when 14,000 tweets controlled a 62-foot vending machine http://bit.ly/13HtBj5 #" + hashtag + " #SXSW2013",
                "@"+user+" Yup, a 62-foot, functional vending machine powered by fans‘ tweets. Enjoy. http://bit.ly/13HtBj5 #" + hashtag + " #SXSW2013",
                "@"+user+" How bold did the fans make it? You‘ll be the judge of that http://bit.ly/13HtBj5 #" + hashtag + " #SXSW2013"
            ];

            var rand = Math.floor(Math.random()*promotionalMessages.length);

            console.log('random number: ' + rand);
            console.log('message: ' + '@'+ user + ' ' + promotionalMessages[rand]);
            console.log('tweeting')
            twit.updateStatus(
                promotionalMessages[rand],
                {in_reply_to_status: '@'},
                function (err, data) {
                    console.log('error: ' + err);
                    console.log('data: ' + data);
                }
            );
                
        }, Math.floor(Math.random()*5000) + 500);
        
    } else {
        console.log('user is undefined');
    }
};

streamHashtag();

app.get('/', function(request, response) {
  
  // stop the stream
  _stream.destroy();
  
  // set a local var of stream hashtag
  var sh = streamHashtag;
  
  // timeout
  setTimeout(function() {
      sh();
  }, 10000);
  
  // send a response
  response.send('Reconnecting to twitter... check the logs to see if we were successful.');
  
});

app.get('/test', function(request, response) {  
  response.sendfile(__dirname + '/testRand.html');
});


app.get('/test/tweets/:key', function(request, response) {
    var key = request.params.key;
    
    var promotionalMessages = [
        "Get ready for the boldest gigs at SXSW put your phone on top of Doritos #" + hashtag + " and push play http://youtu.be/MHtaGC832po",
        "This replay contains pool parties, pyrotechnics and tesla coils. Ready  http://bit.ly/13HtBj5 #" + hashtag + " #SXSW2013",
        "Awesome,  you like 62-foot vending machines and pyro. Here%27s a little more where that came from http://bit.ly/13HtBj5 #" + hashtag + " #SXSW2013",
        "Hey @handle, thanks for asking. Here%27s what went down at #" + hashtag + ", the most interactive stage at #SXSW2013 http://bit.ly/13HtBj5",
        "So you wanted highlights. How about 62-foot hight and pyro http://bit.ly/13HtBj5 #" + hashtag + " #SXSW2013",
        "OK, here%27s what happened when 14,000 tweets controlled a 62-foot vending machine http://bit.ly/13HtBj5 #" + hashtag + " #SXSW2013",
        "Yup, a 62-foot, functional vending machine powered by fans tweets. Enjoy. http://bit.ly/13HtBj5 #" + hashtag + " #SXSW2013",
        "How bold did the fans make it? You%27ll be the judge of that http://bit.ly/13HtBj5 #" + hashtag + " #SXSW2013"
    ];
    
    twit.updateStatus(
        '@FreedomRiders1 ' + promotionalMessages[key],
        {in_reply_to_status: '334755276362223616'},
        function (err, data) {
            console.log('error: ' + err);            
            console.log('data: ' + data);
            
            var res = {
                data: data,
                err: err
            };
            
            response.json(res)
        }
    );
    
});

//app.get('/test.json', function(request, response) {
//  
//    response.writeHead(200, {
//        "Content-Type": "application/json",
//        "Access-Control-Allow-Origin": "*"
//    });
//  
//    var objToJson = {
//        things: "stuff",
//        stuff: "things"
//    };
//    objToJson.response = response;
//    response.write(JSON.stringify(objToJson));
//  
//});

