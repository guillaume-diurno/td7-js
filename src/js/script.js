let listA = document.getElementById("listeAdherents");
let listLivD = document.getElementById("listeLivresDisponibles");
let listLivE = document.getElementById("listeLivresEmpruntes");
let addA = document.getElementById("ajouterAdherent");
let addL = document.getElementById("ajouterLivre");

function ajouterAdherentAjax(nom){
    let url = "./php/requeteAdherent.php?nom=" + nom;
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.send(null);
}

function ajouterLivreAjax(titre){
    let url = "./php/requeteLivre.php?titre=" + titre;
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.send(null);
}

function requeteAJAX(url, callback){
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.addEventListener("load", function () {
        callback(req);
    });
    req.send(null);
}

function callback_AffAd(req){
    listA.innerHTML = "";
    let reponse = JSON.parse(req.responseText);
    reponse.forEach(element => {
        let c = document.createElement("p");
        c.innerHTML = element.idAdherent+" - "+element.nomAdherent;
        listA.appendChild(c);
    });
}
function callback_AffLiv(req){
    listLivD.innerHTML = "";
    let reponse = JSON.parse(req.responseText);
    reponse.forEach(element => {
        let c = document.createElement("p");
        c.innerHTML = element.idLivre+" - "+element.titreLivre;
        listLivD.appendChild(c);
    });
}

addA.onclick = function(){
    ajouterAdherentAjax(document.getElementById("nomAdherent").value);
    requeteAJAX("php/requeteAdherent.php", callback_AffAd);
};
addL.onclick = function(){
    ajouterLivreAjax(document.getElementById("titreLivre").value);
    requeteAJAX("php/requeteLivre.php", callback_AffLiv);
};
requeteAJAX("php/requeteAdherent.php", callback_AffAd);
requeteAJAX("php/requeteLivre.php", callback_AffLiv);