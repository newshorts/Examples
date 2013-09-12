<?php

    $dsn = 'mysql:host=linkedin.cscc2ldy69mr.us-west-2.rds.amazonaws.com;port=3306;dbname=linkedin_surfer';
    $username = 'GSPBetaGroup';
    $password = 'gsp2013720';
    
    $id = '8a76sfg';
    $first_name = 'Mike';
    $last_name = 'Newell';
    $picture_url = 'http://url.com/picture/';
    $pos_id = 97861348;

    $dbh = new PDO($dsn, $username, $password);
    
    $query =    "INSERT INTO linkedin_surfer.people ( id, first_name, last_name, picture_url, pos_id ) VALUES";
    $query .=   " (:id,:first_name,:last_name,:picture_url,:pos_id)";
    
    $stmt = $dbh->prepare($query);
    
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':first_name', $first_name);
    $stmt->bindParam(':last_name', $last_name);
    $stmt->bindParam(':picture_url', $picture_url);
    $stmt->bindParam(':pos_id', $pos_id);
    
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