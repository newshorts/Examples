var fs = require('fs');
var config = require('./config');
var twitter = new (require('ntwitter'))({
    consumer_key: config.twitterConsumerKey,
    consumer_secret: config.twitterConsumerSecret,
    access_token_key: config.twitterAuthToken,
    access_token_secret: config.twitterAuthSecret
});
var mubsub = require('mubsub');

var client = mubsub(config.mubsubChannelUri);
var channel = client.channel(config.mubsubChannelName);

var _TRACK = 'autumn';

client.on('error', console.error);
channel.on('error', console.error);

twitter.stream('statuses/filter', { track: _TRACK }, function(stream) {
    
    stream.on('data', function(tweet) {
        channel.publish('tweet', tweet.text);       
    });

    stream.on('error', function(error, statusCode) {
        console.log('error ' +  error + ' ' + statusCode);
        channel.publish('error', 'error ' +  error + ' ' + statusCode);
    });

    stream.on('end', function(response) {
        console.log('end ' + response);
        channel.publish('end', response);       
    });

    stream.on('destroy', function(response) {
        console.log('destroy ' + response);
        channel.publish('destroy', response);       
    });
});