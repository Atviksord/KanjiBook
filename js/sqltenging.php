<?php

$db = new PDO('mysql:host=localhost;dbname=gg', 'root', 'uCGxHXI6LK');
$stmt = $db->prepare("select * from translation WHERE id=:id");
$stmt->bindParam(':id', $_GET['id']);
$stmt->execute();
echo json_encode($stmt->fetchAll())
?>