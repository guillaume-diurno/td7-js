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

    public static function selectAll($table){
        if ($table == "adherent"){
            $sql = "SELECT * FROM adherent;";
        }else if ($table == "livre"){
            $sql = "SELECT * FROM livre WHERE idLivre NOT IN (SELECT idLivre FROM emprunt);";
        }else if ($table == "emprunt"){
            $sql = "SELECT emprunt.idLivre, livre.titreLivre FROM emprunt JOIN livre ON livre.idLivre = emprunt.idLivre;";
        }
        $req = Model::$pdo->query($sql);
        $req->setFetchMode(PDO::FETCH_CLASS, 'Model');
        $tab = $req->fetchAll();
        return $tab;
    }

    public static function ajouter($table, $donnee){
        switch ($table) {
            case "adherent":
                $sql = "INSERT INTO adherent VALUES (NULL, :nom)";
                $req_prep = Model::$pdo->prepare($sql);
                $values = array(
                    "nom" => $donnee,
                );
                $req_prep->execute($values);
                break;
            case "livre":
                $sql = "INSERT INTO livre VALUES (NULL, :titre)";
                $req_prep = Model::$pdo->prepare($sql);
                $values = array(
                    "titre" => $donnee,
                );
                $req_prep->execute($values);
                break;
        }
    }

    public static function emprunter($idAdherent, $idLivre){
        $sql = "INSERT INTO emprunt VALUES (:idAdherent, :idLivre)";
        $req_prep = Model::$pdo->prepare($sql);
        $values = array(
            "idAdherent" => $idAdherent,
            "idLivre" => $idLivre,
        );
        $req_prep->execute($values);
    }

    public static function getLivresByID($idAdherent){
        $sql = "SELECT nomadherent,titreLivre FROM livre
                JOIN emprunt ON livre.idLivre=emprunt.idLivre
                JOIN adherent ON adherent.idAdherent = emprunt.idAdherent
                Where emprunt.idAdherent= :idAdherent";
        $req_prep = Model::$pdo->prepare($sql);
        $values = array(
            "idAdherent" => $idAdherent,
        );
        $req_prep->execute($values);
        $req_prep->setFetchMode(PDO::FETCH_CLASS, 'Model');
        $tab = $req_prep->fetchAll();
        return $tab;
    }

}

// on initialise la connexion $pdo
Model::init_pdo();

?>
