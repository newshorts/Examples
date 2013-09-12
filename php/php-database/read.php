<?php

    $dsn = 'mysql:host=linkedin.cscc2ldy69mr.us-west-2.rds.amazonaws.com;port=3306;dbname=linkedin_surfer';
    $username = 'GSPBetaGroup';
    $password = 'gsp2013720';
    
    $dbh = new PDO($dsn, $username, $password);
    
    $query =    'SELECT * FROM linkedin_surfer.people';
    
    $stmt = $dbh->prepare($query);
    
    if ($stmt->execute()) {
        echo "<pre>";
        while ($row = $stmt->fetch()) {
            print_r($row);
        }
    }
    
    print_r($dbh->errorInfo());

?>