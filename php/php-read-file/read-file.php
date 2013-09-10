<?php
    $file = file_get_contents('./people.txt', FILE_USE_INCLUDE_PATH);
    echo $file;
?>