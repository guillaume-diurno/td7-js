class Adherent {
    constructor(nom){
        this.nom = nom;
    }

    function requeteAJAX(nom, callback) {
        let url = "php/requetteAdherent.php?nom=" + nom;
        let requete = new XMLHttpRequest();
        requete.open("GET", url, true);
        requete.addEventListener("load", function () {
            callback(requete);
        });
        requete.send(null);
    }
}