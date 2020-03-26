<?php
require_once("Model.php");

if (isset($_GET['f'])){
    $fonction = $_GET['f'];
    $name = $_GET['nom'];
}

$adherents = Model::selectAll("adherent");
$livre = Model::selectAll("livre");

echo json_encode($adherents);