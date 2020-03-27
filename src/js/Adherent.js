class Adherent {
    constructor(nom){
        this.nom = nom;
    }

     static requeteAJAX(url, callback){
        let req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.addEventListener("load", function () {
            callback(req);
        });
        req.send(null);
    }

    static callback_AffAd(req){
        listA.innerHTML = "";
        let reponse = JSON.parse(req.responseText);
        reponse.forEach(element => {
            let c = document.createElement("p");
            c.innerHTML = element.idAdherent+" - "+element.nomAdherent;
            c.onclick = function(){
                Adherent.requeteAJAX("php/requeteAdherent.php?id="+element.idAdherent, Adherent.callback_Ad);
            };
            c.style.cursor = "pointer";
            listA.appendChild(c);
        });
    }

    static ajouterAdherentAjax(nom){
        let url = "./php/requeteAdherent.php?nom=" + nom;
        let requete = new XMLHttpRequest();
        requete.open("GET", url, true);
        requete.send(null);
    }

    static callback_Ad(req){
        let reponse = JSON.parse(req.responseText);
        if (reponse.length != 0){
            let s = "", titres = "", nomA = reponse[0].nomadherent;
            reponse.forEach(element => {
                titres = titres+"- "+element.titreLivre+"\n";
            });
            if (reponse.length > 1) s="s";
            alert(nomA+" a "+reponse.length+" emprunt"+s+" en ce moment :\n"+titres);
        }else alert("Cette personne n'a pas d'emprunt.");
    }

}