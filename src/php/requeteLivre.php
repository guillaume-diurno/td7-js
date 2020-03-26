<?php
require_once("Model.php");
if (isset($_GET["titre"])) {
    Model::ajouter("livre", $_GET["titre"]);
}
?>