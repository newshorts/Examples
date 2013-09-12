<?php

    $dsn = 'mysql:host=linkedin.cscc2ldy69mr.us-west-2.rds.amazonaws.com;port=3306;dbname=linkedin_surfer';
    $username = 'GSPBetaGroup';
    $password = 'gsp2013720';
    
    $id = '8a76sfg';
    $first_name = 'Michael';
    
    $dbh = new PDO($dsn, $username, $password);
    
    $query =    "UPDATE linkedin_surfer.people SET first_name=:first_name WHERE id=:id";
    
    $stmt = $dbh->prepare($query);
    
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':first_name', $first_name);
    
    if ($stmt->execute()) {
        echo "<pre>";
        while ($row = $stmt->fetch()) {
            print_r($row);
        }
    } else {
        echo "unable to execute statement.";
        print $stmt->errorCode();
        print_r($stmt->errorInfo());
        print $dbh->errorCode();
        print_r($dbh->errorInfo());
    }
    
?>