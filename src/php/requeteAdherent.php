<?php
require_once("Model.php");
if (isset($_GET["nom"])) {
    Model::ajouter("adherent", $_GET["nom"]);
}
?>