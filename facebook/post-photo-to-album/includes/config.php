<?php

/**
 *  Configuration file. Detects if you're on localhost and enters the appropriate api key.
 */
    // test account
    $config = array(
        'appId'  => '317973431658835',
        'secret' => '48b84c2c44f6310765681e1e51a6aabd',
        'fileUpload' => true
    );

    if(strpos($_SERVER['SERVER_NAME'], "localhost") === false) {    
        // production account
        $config = array(
            'appId'  => '442992315782142',
            'secret' => '8a53612e97e70d7096628e1212829cd1',
            'fileUpload' => true
        );
    }
    
    // the image
    $path_to_image = dirname(dirname(__FILE__)) . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . 'facebook_share.jpg';
    
?>