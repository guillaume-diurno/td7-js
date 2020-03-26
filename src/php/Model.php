<?php

require_once('Conf.php');

class Model {

    public static $pdo;

    public static function init_pdo() {
        $host   = Conf::getHostname();
        $dbname = Conf::getDatabase();
        $login  = Conf::getLogin();
        $pass   = Conf::getPassword();
        try {
            // connexion à la base de données
            // le dernier argument sert à ce que toutes les chaines de charactères
            // en entrée et sortie de MySql soit dans le codage UTF-8
            self::$pdo = new PDO("mysql:host=$host;dbname=$dbname", $login, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            // on active le mode d'affichage des erreurs, et le lancement d'exception en cas d'erreur
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $ex) {
            echo $ex->getMessage();
            die("Problème lors de la connexion à la base de données.");
        }
    }

    public static function ajouter($table, $donnee){
        switch ($table):
            case "adherent":
                $sql = "INSERT INTO 'adherent' ('idAdherent','nomAdherent') (VALUES :sql_id, :sql_nom)";
                $tab = array(
                    "sql_id" => $donnee[idAdherent],
                );
            case "livre":
                $sql = "INSERT INTO 'livre' ('idLivre','titreLivre') (VALUES :sql_id, :sql_titre)";
                $tab = array(
                    "sql_id" => $donnee[idLivre],
                    "sql_titre" => $donnee[titreLivre]
                );
            case "emprunt":
                $sql = "INSERT INTO 'emprunt' ('idAdherent','idLivre') (VALUES :sql_idA, :sql_idL)";
                $tab = array(
                    "sql_idA" => $donnee[idAdherent],
                    "sql_idL" => $donnee[idLivre]
                );
    }

}

// on initialise la connexion $pdo
Model::init_pdo();

?>
