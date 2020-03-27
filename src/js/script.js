let listA = document.getElementById("listeAdherents");
let listLivD = document.getElementById("listeLivresDisponibles");
let listLivE = document.getElementById("listeLivresEmpruntes");
let addA = document.getElementById("ajouterAdherent");
let addL = document.getElementById("ajouterLivre");

function majAll(){
    Adherent.requeteAJAX("php/requeteAdherent.php", Adherent.callback_AffAd);
    Livre.requeteAJAX("php/requeteLivre.php", Livre.callback_AffLiv);
    Emprunt.requeteAJAX("php/requeteEmprunt.php", Emprunt.callback_AffEmp);
}

addA.onclick = function(){
    Adherent.ajouterAdherentAjax(document.getElementById("nomAdherent").value);
    majAll();
};
addL.onclick = function(){
    Livre.ajouterLivreAjax(document.getElementById("titreLivre").value);
    majAll();
};
document.addEventListener("DOMContentLoaded", function(){ majAll(); });

