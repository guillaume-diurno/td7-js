<?php
require_once("Model.php");

if ((isset($_GET["idAdherent"])) && (isset($_GET["idLivre"]))){
    Model::emprunter($_GET["idAdherent"],$_GET["idLivre"]);
}
else if (isset($_GET["idLivre"])){
    Model::rendre($_GET["idLivre"]);
}
else{
    echo json_encode(Model::selectAll("emprunt"));
}