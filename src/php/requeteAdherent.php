<?php
require_once("Model.php");

if (isset($_GET["nom"])) {
    Model::ajouter("adherent", $_GET["nom"]);
}else if (isset($_GET["id"])) {
    echo json_encode(Model::getLivresByID($_GET["id"]));
}else{
    $adherents = Model::selectAll("adherent");
    echo json_encode($adherents);
}
?>