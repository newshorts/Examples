<?php

    /**
     * To append to the file set to 'append' otherwise the script will just overwrite the file
     */
    $action = 'overwrite';

    // randomly generated file name
    $file = 'Rand_'. time() .'.txt';
    
    if($action == 'append') {
        $current = file_get_contents($file);
        $current .= "Patrick Wong\n";
    } else {
        $current = 'Russell Shearererer\n';
    }
    
    file_put_contents($file, $current);
?>