<?php
require_once("Model.php");

if (isset($_GET["nom"])) {
    Model::ajouter("adherent", $_GET["nom"]);
}

if (isset($_GET["id"])) {
    Model::getLivresByID($_GET["id"]);
}

$adherents = Model::selectAll("adherent");

echo json_encode($adherents);
?>