class Emprunt {
    static requeteAJAX(url, callback){
        let req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.addEventListener("load", function () {
            callback(req);
        });
        req.send(null);
    }

    static callback_AffEmp(req){
        listLivE.innerHTML = "";
        let reponse = JSON.parse(req.responseText);
        reponse.forEach(element => {
            let c = document.createElement("p");
            c.innerHTML = element.idLivre+" - "+element.titreLivre;
            c.onclick = function(){
                if (confirm("Livre prêté à "+element.nomAdherent+".\nRetour de ce livre ?")){
                    Emprunt.requeteAJAX("php/requeteEmprunt.php?idLivre="+element.idLivre, console.log);
                    majAll();
                }
            };
            listLivE.appendChild(c);
        });
    }
}