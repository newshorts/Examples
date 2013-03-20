<?php

require_once '..'.DIRECTORY_SEPARATOR.'include'.DIRECTORY_SEPARATOR.'config.php';
require_once '..'.DIRECTORY_SEPARATOR.'lib'.DIRECTORY_SEPARATOR.'facebook-php-sdk'.DIRECTORY_SEPARATOR.'src'.DIRECTORY_SEPARATOR.'facebook.php';

$facebook = new Facebook($config);
$access_token = $facebook->getAccessToken();
$user = $facebook->getUser();

if(isset($_GET['upload']) && $_GET['upload'] == true) {
    
    $data = post_photo_to_album();
    $arr = array(response => true, data => $data);

    header('Content-type: application/json');
    echo json_encode($arr);
    
} else {
    
    var_dump($config);
    var_dump($facebook);
    var_dump($_SERVER);
}

/**
 *  Post a photo to the default user album
 * 
 *  @param void
 *  @return array Response from the facebook api's request to upload a photo
 */
function post_photo_to_album() {
    
    $facebook->setFileUploadSupport(true);
    $args = array('message' => 'Photo Caption');
    $args['image'] = '@' . realpath($path_to_image);

    return $facebook->api('/me/photos', 'post', $args);

}
?>
