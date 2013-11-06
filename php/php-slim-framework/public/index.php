<?php
require '../lib/Slim/Slim.php';
require '../lib/facebook/src/facebook.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app->config(array(
    'debug' => true,
    'templates.path' => './templates'
));

$facebook = new Facebook(array(
  'appId'  => '426557000803058',
  'secret' => 'e2119d478b1d693d17d6bb741b9333fe'
));

$app->get('/facebook', function() use ($app) {
    $app->redirect('/GSP/internal/examples/php/php-slim-framework/public/facebook/login');
});

$app->get('/facebook/channel', function() use ($app) {
    $cache_expire = 60*60*24*365;
    header("Pragma: public");
    header("Cache-Control: max-age=".$cache_expire);
    header('Expires: ' . gmdate('D, d M Y H:i:s', time()+$cache_expire) . ' GMT');
    $app->render('channel.html');
});

$app->get('/facebook/login', function() use ($app, $facebook) {
    $app->render('login.html');
});

$app->get('/facebook/logged/in', function() use ($app, $facebook) {
    // Get User ID
    $user = $facebook->getUser();
    if ($user) {
        try {
            $user_profile = $facebook->api('/me');
            $app->render('index.php', array(
                'user' => $user,
                'user_profile' => $user_profile
            ));
        } catch (FacebookApiException $e) {
            $user = '';
            $app->render('index.php', array(
                'error' => $e
            ));
        }
    }
});



$app->run();