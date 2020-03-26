

let listA = document.getElementById("listeAdherents");
let listLivD = document.getElementById("listeLivresDisponibles");
let listLivE = document.getElementById("listeLivresEmpruntes");

let addA = document.getElementById("ajouterAdherent");
addA.onclick=function(){ajouterAdherentAjax(document.getElementById("nomAdherent").value , console.log );};

let addL = document.getElementById("ajouterLivre");
addL.onclick=function(){ajouterLivreAjax(document.getElementById("titreLivre").value , console.log );};


function ajouterAdherentAjax(nom, callback){
    let url = "http://webinfo.iutmontp.univ-montp2.fr/~spohrq/JS/td7-js/src/php/requeteAdherent.php?nom=" + nom;
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.addEventListener("load", function () {
        callback(requete);
    });
    requete.send(null);}

function ajouterLivreAjax(titre, callback){
    console.log(titre);
    let url = "http://webinfo.iutmontp.univ-montp2.fr/~spohrq/JS/td7-js/src/php/requeteLivre.php?titre=" + titre;
    console.log(url);
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.addEventListener("load", function () {
        callback(requete);
    });
    requete.send(null);
}