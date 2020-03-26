<?php
require_once("Model.php");

if (isset($_GET["titre"])) {
    Model::ajouter("livre", $_GET["titre"]);
}

$livre = Model::selectAll("livre");

echo json_encode($livre);
?>