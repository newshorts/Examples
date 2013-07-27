var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    mysql = require('mysql'),
    twitter = require('ntwitter'),
    events = require('events'),
    spider = Object.create(new events.EventEmitter);
    
// TODO place these to a plugins modules
Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
};

app.use(express.logger());
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

var pool = mysql.createPool({
    host     : 'bribethesenate.cscc2ldy69mr.us-west-2.rds.amazonaws.com',
    user     : 'bribethe',
    password : 'bribethe123'
});

var _ENV = 'production';

if(_ENV == 'production') {
    // doritos info
    var twit = new twitter({
      consumer_key: 'OHszkiTyjmyMdqHQ7jrtQ',
      consumer_secret: 'cljOYlQObJg0p4Ks7fimXGhD6qVIeRZJztu7OjDwk',
      access_token_key: '1278948026-oadQz9ATcpgrDNrAU99WXc0sfrL7xX0qeNn02cH',
      access_token_secret: 'NAj13wEi5LodC50q6EjHSWRD7QoIPe7qtxg39Fk8jp4'
    });
    
    var hash = 'BribeTheSenate';
    
} else {
    // beta
    var twit = new twitter({
      consumer_key: 'q9lDW7wsXvz6dtI5Rju5Xw',
      consumer_secret: 'lVrIl9qIgdEYVWW6E1FlkTh0INTYnwsfTCgZA79U4',
      access_token_key: '1278948026-ovJDjB2ASahGTkA4yqHec7eyvnirLJInBl5KGd7',
      access_token_secret: 'AGL1ct5ZOY6Gkwpiuy6gruikl6eTu7ww1u4OAjmtlE'
    });
    
    var hash = 'omgmike';
}

var COUNT = 0;
    
app.get('/', function(request, response) {
    response.sendfile(__dirname + '/index.html');
}); 

app.get('/count/', function(request, response) {
    countTweets();
    console.log(COUNT)
    response.jsonp(COUNT);
});
    
var port = process.env.PORT || 5000;
server.listen(port, function() {
    console.log("Listening on " + port);
});

function createStreams() {
    
    var self = this;

    twit.stream('statuses/filter', {'track':hash}, function(stream) {

        stream.on('data', function (data) {
            console.log('got new data');
            spider.emit('new_data', data);
            return;
        });

        stream.on('end', function (response) {
            // TODO find out how to easily log this
            console.log('end')
            console.log(response)
        });

        stream.on('destroy', function (response) {
            console.log('destroyed')
            console.log(response)
        });

    });
}

spider.on('new_data', function(data) {
    console.log('handling the new data')
    handleTweet(data);
    return;
});

// takes the origin al return from twitter and begins parsing
function handleTweet(data) {
    console.log('data = ' + data);
    if(typeof data.disconnect != "undefined") {
        console.log("we're disconnected so I dont think we can do this right now.")
        return;
    } else {
        console.log('the tweet looks legit, beginning the process')
        var tweet = parseTweet(data);
        var id = tweet.id;
        
        var escapes = {
            id: id
        };
        // search the db for the tweets
        getQuery('SELECT tweet_id FROM bribe_the_senate.tweets WHERE tweet_id=:id', escapes, function(err, rows, fields) {
            if (err) throw err;
            
            console.log('outputting the return from the db')
            console.log(rows);
            console.log(fields);
            
            // if we dont find the tweet in our db...then insert the tweet
            if(rows.length === 0) {
                insertTweet(tweet);
            } else {
                return;
            }
        });
    }
}

function insertTweet(tweet) {
    
    var escapes = {
        id: tweet.id,
        text: tweet.text,
        created_at: tweet.created_at,
        lat: tweet.lat,
        long: tweet.long,
        user_id: tweet.user_id,
        screen_name: tweet.screen_name,
        name: tweet.name,
        profile_image_url: tweet.profile_image_url,
        entities: tweet.entities
    };
    
    console.log('inserting record')
    console.log(escapes);
    
    var query = 'INSERT INTO bribe_the_senate.tweets ';
        query += '(tweet_id, tweet_text, created_at, geo_lat, geo_long, user_id, screen_name, name, profile_image_url, entities) ';
        query += 'VALUES ';
        query += '(:id, :text, FROM_UNIXTIME(:created_at, "%Y-%m-%d %H:%i:%s"), :lat, :long, :user_id, :screen_name, :name, :profile_image_url, :entities)';
        
    getQuery(query, escapes, function(err, rows, fields) {
        if (err) throw err;
        
        console.log('able to insert the record');
    });
}

function countTweets() {
   // query for data on all ids
    var query = "SELECT COUNT(*) AS tweet_count FROM bribe_the_senate.tweets;";
    
    getQuery(query, {}, function(err, p, fields) {
        if (err) throw err;
        
        console.log('returned data')
        console.log(p[0])
        console.log(fields)
        
        COUNT = p[0];
    });
}

function getQuery(q, e, cb) {
    
    var query = q;
    var escapes = e;
    var callback = cb;
    
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        
        connection.config.queryFormat = function (query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function (txt, key) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this));
        };
        
        connection.query(query, escapes, callback);
        connection.end();
    });
}

function parseTweet(tweet) {
    console.log('trying to parse tweet')
//    console.log(tweet);
    if(tweet) {
        // tweet is defined
        
        var lat = 0;
        var long = 0;
        
        if(typeof tweet.geo !== 'undefined' && tweet.geo !== null) {
            if(typeof tweet.geo.coordinates !== 'undefined' && tweet.geo.coordinates.length > 0) {
                lat = tweet.geo.coordinates[0];
                long = tweet.geo.coordinates[1];
            }
        }
        
        var created_at = prepareDate(tweet.created_at);
        
        var result = {
            id: tweet.id_str,
            text: tweet.text,
            created_at: created_at,
            lat: lat,
            long: long,
            user_id: tweet.user.id_str,
            screen_name: tweet.user.screen_name,
            name: tweet.user.name,
            profile_image_url: tweet.user.profile_image_url,
            entities: JSON.stringify(tweet.entities)
        };
        
        return result;
    }
}

function prepareDate(twitter_date) {
    
    var date = new Date(Date.parse(twitter_date.replace(/( \+)/, ' UTC$1')));
    
    return (Date.parse(date) / 1000);
}

createStreams();