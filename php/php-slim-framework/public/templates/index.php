<!DOCTYPE html>
<html>
    <head>
        <title>Facebook</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>
<?php if(isset($user)) : ?>
        <div>
            <h1><?php echo $user; ?></h1>
            <pre>
                <?php print_r($user_profile); ?>
            </pre>
        </div>
<?php else: ?>
        <div>
            <pre>
                <?php print_r($error); ?>
            </pre>
        </div>
<?php endif; ?>
    </body>
</html>