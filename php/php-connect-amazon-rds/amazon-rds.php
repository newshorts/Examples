<?php
    $dsn = 'mysql:host=healthcarecostmapper.cscc2ldy69mr.us-west-2.rds.amazonaws.com;port=3306;dbname=healthcare_cost_mapper';
    $username = 'GSPBetaGroup';
    $password = 'gsp2013720';

    $dbh = new PDO($dsn, $username, $password);
    
    $stmt = $dbh->prepare("SELECT * FROM healthcare_cost_mapper.diseases;");
    if ($stmt->execute()) {
        echo "<pre>";
        while ($row = $stmt->fetch()) {
            print_r($row);
        }
    }
?>