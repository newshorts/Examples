var config = {}

// environmentals
config.environment = process.env.DEVELOPMENT_ENVIRONMENT;
config.baseUri = process.env.BASE_URI;
config.port = 5050;
//config.socketPort = 5051;

config.mubsubChannelName = 'twitter';

if(config.environment == 'local') {
    // mubsub
    config.mubsubChannelUri = 'mongodb://localhost.com:27017/mubsub_example';
    
    // twitter keys
    config.twitterConsumerKey = 'kNtzFveQNy0IPEQWfUnvdg';
    config.twitterConsumerSecret = 'fay7hKw2nLaKTJt6DBHRn2v1gAJbxaIe3ZPMxvazeA';
    config.twitterAuthToken = '1278948026-zML1TDruoGgV1FzXfuF1vS8gjOuEWWcD1ZaT2pR';
    config.twitterAuthSecret = 'xSauVSjd7fiYfslX0xvUmJFthVTuL5F8BgX9EfMMbB268';
} else {
    // mubsub
    config.mubsubChannelUri = 'mongodb://54.212.125.42:27017/mubsub_example';
    
    // twitter keys
    config.twitterConsumerKey = 'RD4Qlw2Y5JxVucSHNhFCYg';
    config.twitterConsumerSecret = 'fruC1zb4xikAhQOiWH5v53wsSWP5DCKTEYvvbgDH7g';
    config.twitterAuthToken = '1278948026-t9mpHQ4p5bWYJzhS925j4TFSAP8RjaIPxUpkK0C';
    config.twitterAuthSecret = '9EH7kOraj7MJnloPreH5CUiurkHFrdNrGgAH3unEn93LC';
}

config.OK = 200;
config.NOT_LOGGED_IN = 205;
config.FILE_NOT_FOUND = 302;
config.ENCOUNTERED_ERROR = 401;
config.FORBIDDEN = 403;

module.exports = config;