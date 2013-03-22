var ACCOUNT = 'GSPBetaGroup';

var twitter = require('ntwitter'),
    events = require('events'),
//    accounts = require('./includes/accounts.js'),
    spider = Object.create(new events.EventEmitter);
    
var accounts = new Array();

accounts['FreedomRiders1'] = {
    consumer_key: 'LH7uAFOZ7mOQJSNsh8ux2Q',
    consumer_secret: 'tdywghhGW3X3hufBkJSK2SH2s0AsXEOPzmHC3PmIY',
    access_token_key: '322717909-0zLS5x6DnivdeC4kjrAjRqUUmS3vd78HxNWszi4C',
    access_token_secret: 'Fepo81HC6eN5YmxnbiNKa0itA6Q1jHFYsW86jrs3E'
};

accounts['GSPCandyBowl'] = {
    consumer_key: 'HD8uFbzwL8poBHRKMs6Ng',
    consumer_secret: 'xtLyToo9QfpUl5B2afpOg6KA7uJEkBJlMn5TFo',
    access_token_key: '1167339619-8IN9C4KqBCSwl0BFMOljlgwFYwRuZFaOu1R1tMO',
    access_token_secret: 'xdFrgJUBQXraIlQrVC0UySZTUOuxGNAZto9H7G4kC4E'
};

accounts['AustinTest2'] = {
    consumer_key: 'uuDBHWx4KqGT3Agq2o16A',
    consumer_secret: 'u86GJUFu9f23SBulpJrjEU6dTB8t5l8gJ5U4oFjE',
    access_token_key: '1138504974-RL5M0RdhHjH2LtkLajMyTulF2SQ8bK1YapVZkQs',
    access_token_secret: 'UZSyn9FoAoJ7puaMpilxg7eDgncPuY34z5q4FiguSk'
};

accounts['GSPBetaGroup'] = {
    consumer_key: 'rap6wA0hZ5iLttdtlj7lQ',
    consumer_secret: 'KuNQjKyYoYy7THwgRDBDHnbBGPeR5Z47yjbBOhJqERo',
    access_token_key: '1278948026-h1jLIrYCSE53veSejYG70o74DS7xZmEMhWXySiP',
    access_token_secret: 'UIDXDWDWMN0tLSDsB5MX6DnaxWFpaPuoeS40w7Djxkc'
};
    
//console.log(new Accounts());
    
if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var redis = require("redis"),
        client1 = redis.createClient(rtg.port, rtg.hostname),
        client2 = redis.createClient(rtg.port, rtg.hostname);

    client1.auth(rtg.auth.split(":")[1]);
    client2.auth(rtg.auth.split(":")[1]);
} else {
    var redis = require("redis"),
        client1 = redis.createClient(),
        client2 = redis.createClient();
}

var twit;

var createTwit = function() {
    twit = new twitter({
        consumer_key: accounts[ACCOUNT].consumer_key,
        consumer_secret: accounts[ACCOUNT].consumer_secret,
        access_token_key: accounts[ACCOUNT].access_token_key,
        access_token_secret: accounts[ACCOUNT].access_token_secret
    });
}

// set some events
var streamAccount = function() {
    
    twit.stream('user', {track:ACCOUNT}, function(stream) {
        
        stream.on('data', function (data) {
            
            spider.emit('tweet', data);
            
        });
        
        stream.on('end', function (response) {
            // Handle a disconnection
            // TODO find out how to easily log this
        });
        
        stream.on('destroy', function (response) {
            // Handle a 'silent' disconnection from Twitter, no end/error event fired
            // TODO make a log of this so we can find out if it disconnected
        });
        
        // TODO I'm pretty sure I don't want to do this
        // Disconnect stream after five seconds
//        setTimeout(stream.destroy, 5000);
    });
    
};

// FOR PRODUCTION TURN THESE ON
createTwit();
streamAccount();

var lastTweet;

spider.on('tweet', function(data) {
    // TODO output the data
//    console.log('from spider event in worker: ' + data.user)
    if(typeof data != 'undefined') {
        if(typeof data.user != 'undefined') {
            if(typeof data.user.screen_name != 'undefined') {
                if(data.user.screen_name == ACCOUNT) {
//                    console.log('tweet made it in account name: ' + ACCOUNT)
//                    console.log('tweet made it screen name: ' + data.user.screen_name)
//                    console.log('tweet made it in data atext: ' + data.text)
                    if(lastTweet !== data.text) {
//                        console.log('publishing tweet: ' + data.text)
                        
                        client2.publish("tweet", data.text);
                        
                        lastTweet = data.text;
                    }
                }
            }
        }
    }
        
});