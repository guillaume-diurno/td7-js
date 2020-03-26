<?php
require_once("Model.php");

if (isset($_GET["id"])){

}else{
    echo json_encode(Model::selectAll("emprunt"));
}