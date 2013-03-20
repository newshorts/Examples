<?php

require_once dirname(dirname(__FILE__)).DIRECTORY_SEPARATOR.'includes'.DIRECTORY_SEPARATOR.'config.php';
require_once dirname(dirname(__FILE__)).DIRECTORY_SEPARATOR.'lib'.DIRECTORY_SEPARATOR.'facebook-php-sdk'.DIRECTORY_SEPARATOR.'src'.DIRECTORY_SEPARATOR.'facebook.php';

$facebook = new Facebook($config);
$facebook->setFileUploadSupport(true);
$access_token = $facebook->getAccessToken();
$user = $facebook->getUser();

if(isset($_GET['upload']) && $_GET['upload'] == true) {
    
    
    // setup
    $args = array('message' => 'Photo Caption');
    $args['image'] = '@' . realpath($path_to_image);

    //upload
    $facebook->api('/me/photos', 'post', $args);
    
    $arr = array(response => true, data => $data);

    header('Content-type: application/json');
    echo json_encode($arr);
    
} else {
    
    var_dump($config);
    var_dump($facebook);
    var_dump($_SERVER);
    var_dump($path_to_image);
}
?>
