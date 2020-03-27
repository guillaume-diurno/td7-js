class Livre {
    static requeteAJAX(url, callback){
        let req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.addEventListener("load", function () {
            callback(req);
        });
        req.send(null);
    }

    static callback_AffLiv(req){
        listLivD.innerHTML = "";
        let reponse = JSON.parse(req.responseText);
        reponse.forEach(element => {
            let c = document.createElement("p");
            c.innerHTML = element.idLivre+" - "+element.titreLivre;
            c.onclick = function(){
                let p = prompt("Prêt de \""+element.titreLivre+"\".\nn° de l'emprunteur ?");
                if (p!=null && p!=""){
                    Adherent.requeteAJAX("php/requeteEmprunt.php?idAdherent="+p+"&idLivre="+element.idLivre, console.log);
                    majAll();
                }
            };
            c.style.cursor = "pointer";
            listLivD.appendChild(c);
        });
    }

    static ajouterLivreAjax(titre){
        let url = "./php/requeteLivre.php?titre=" + titre;
        let requete = new XMLHttpRequest();
        requete.open("GET", url, true);
        requete.send(null);
    }
}