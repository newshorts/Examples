<?php require_once 'include' . DIRECTORY_SEPARATOR . 'config.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Facebook post to album</title>
        <link rel="stylesheet" href="css/style.css" type="text/css" />
    </head>
    <body>
        
        <!-- please include this anywhere on your page, it's invisible -->
        <div id="fb-root"></div>
        
        <div id="wrap">
            <button class="upload">Upload</button>
        </div>

        <!-- Grab Google CDN's jQuery. fall back to local if necessary -->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script>
            
            window.fbAsyncInit = function() {
                // init the FB JS SDK
                FB.init({
                    appId      : <?php echo $config['appId']; ?>, // App ID from the App Dashboard
                    channelUrl : '//localhost.com/channel.html', // Channel File for x-domain communication
                    status     : true, // check the login status upon init?
                    cookie     : true, // set sessions cookies to allow your server to access the session?
                    xfbml      : true  // parse XFBML tags on this page?
                });
            };

            // Load the SDK's source Asynchronously
            (function(d, debug){
                var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement('script'); js.id = id; js.async = true;
                js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
                ref.parentNode.insertBefore(js, ref);
             }(document, /*debug*/ false));
            
            (function($) {
                $(window).load(function() {
                    /**
                     *  Setup a custom event trigger (has nothing to do with facebook).
                     *  If we receive this event, we know to send a signal to our 
                     *  upload php script to begin uploading a user photo
                     * */
                    $('.upload').on('connected', function() {
                        var cwd = window.location.protocol + '//' + window.location.host + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'))  
                        
                        setTimeout(function() {
                            $.get(cwd + "/upload/?upload=true", function(data) {
                                console.dir(data);

                                if(data.response == true) {
                                    alert('posted to your facebook profile!');
                                }

                            }, "json");
                        }, 500);
                        
                        console.log('triggered a response of connected')
                    });
                    
                    /**
                     *  Listen for a click on the upload button and figure out
                     *  if our user is logged in or not, then handle accordingly
                     * */
                    $('.upload').on('click', function(evt) {
                    
                        var login = presentLogin;
                        
                        FB.getLoginStatus(function(response) {
                            if (response.status === 'connected') {
                                // then the user is logged in already
                                $('.upload').trigger('connected');
                            } else if (response.status === 'not_authorized') {
                                // the user is logged in to facebook but has not authorized the app
                                login('email,user_likes,publish_actions');
                            } else {
                                // the user is not logged in to facebook
                                login('email,user_likes,publish_actions');
                            }
                            console.dir(response)
                        });
                             
                    });
                    
                    /**
                     *  Present the user with the facebook login popup. Once they log in
                     *  they will automatically be presented with an "allow" screen asking
                     *  them to "allow" your app to have the permissions defined at the 
                     *  bottom of this function
                     *  
                     *  @param {string} Facebook scope permissions (https://developers.facebook.com/docs/reference/login/extended-permissions/)
                     *  
                     *  @return {void} No return
                     * 
                     * */
                    var presentLogin = function(scope) {
                        FB.login(function(response) {
                            console.log("reponse from login")
                            console.dir(response)
                            if (response.authResponse) {
                                console.log('Welcome!  Fetching your information.... ');
                                FB.api('/me', function(response) {
                                    console.log('response from /me')
                                    console.dir(response)
                                    console.log('Good to see you, ' + response.name + '.');
                                    $('.upload').trigger('connected');
                                });
                            } else {
                                console.log('User cancelled login or did not fully authorize.');
                            }
                        }, {scope: scope});
                    };
                    
                });
            })(jQuery);
        </script>
    </body>
</html>

