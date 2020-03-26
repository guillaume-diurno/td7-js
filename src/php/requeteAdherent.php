<?php
require_once("Model.php");

if (isset($_GET["nom"])) {
    Model::ajouter("adherent", $_GET["nom"]);
}

$adherents = Model::selectAll("adherent");

echo json_encode($adherents);
?>