<?php

$db = new PDO('mysql:host=localhost;dbname=gg', 'root', 'uCGxHXI6LK');
$stmt = $db->prepare("select * from translation");
##$stmt->bindParam(':id', $_GET['id']);
$stmt->execute($_GET['id']);
echo json_encode($stmt->fetchAll())
?>