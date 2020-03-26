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
        c.onclick = function(){
            requeteAJAX("php/requeteAdherent.php?id="+element.idAdherent, callback_Ad);
        };
        c.style.cursor = "pointer";
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

function callback_AffEmp(req){
    listLivE.innerHTML = "";
    console.log(req);
    let reponse = JSON.parse(req.responseText);
    reponse.forEach(element => {
        let c = document.createElement("p");
        c.innerHTML = element.idLivre+" - "+element.titreLivre;
        listLivE.appendChild(c);
    });
}

function callback_Ad(req){
    let reponse = JSON.parse(req.responseText);
    if (reponse.length != 0){
        let s = "", titres, nomA = reponse[0].nomadherent;
        reponse.forEach(element => {
            titres = titres+"- "+element.titreLivre+"\n";
        });
        if (reponse.length > 1) s="s";
        alert(nomA+" a "+reponse.length+" emprunt"+s+" en ce moment :\n"+titres);
    }else alert("Cette personne n'a pas d'emprunt.");
}

addA.onclick = function(){
    ajouterAdherentAjax(document.getElementById("nomAdherent").value);
    requeteAJAX("php/requeteAdherent.php", callback_AffAd);
};
addL.onclick = function(){
    ajouterLivreAjax(document.getElementById("titreLivre").value);
    requeteAJAX("php/requeteLivre.php", callback_AffLiv);
};
document.addEventListener("DOMContentLoaded", function(){
    requeteAJAX("php/requeteAdherent.php", callback_AffAd);
    requeteAJAX("php/requeteLivre.php", callback_AffLiv);
    requeteAJAX("php/requeteEmprunt.php", callback_AffEmp);
});

