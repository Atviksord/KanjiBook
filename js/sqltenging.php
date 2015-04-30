<?php

$db = new PDO('mysql:host=localhost;dbname=gg', 'root', 'uCGxHXI6LK');
$stmt = $db->prepare("select word, translation from translation where id=?");
$stmt->execute($_GET['id']);
echo json_encode($stmt->fetchAll())
?>