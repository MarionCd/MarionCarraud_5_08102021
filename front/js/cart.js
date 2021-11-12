/************************** AFFICHAGE DU CONTENU DU LOCALSTORAGE DANS LA PAGE PANIER **********************/

function emptyCart(){ 
    window.alert("il n'y a rien dans le panier pour le moment :(")
};

let section = document.getElementById("cart__items");

let panier = JSON.parse(localStorage.getItem("product"));

let totalQty = [];
let totalPrix = [];

if(!localStorage.getItem("product")) {
    emptyCart()
  } else {
    for (let i = 0; i < panier.length; i++) {

        const article = document.createElement('article');
        section.appendChild(article);
        article.classList.add("cart__item");
        article.setAttribute('data-id', `${panier[i].id}`)
    
            const divImg = document.createElement('div');
            article.appendChild(divImg);
            divImg.classList.add('cart__item__img')
    
                const img = document.createElement('img');
                divImg.appendChild(img);
                img.setAttribute('src', `${panier[i].imageURL}`);
                img.setAttribute('alt', "Photographie d'un canapé");
            
            const divContent = document.createElement('div');
            article.appendChild(divContent);
            divContent.classList.add('cart__item__content');
    
                const divContentPrice = document.createElement('div');
                divContent.appendChild(divContentPrice);
                divContentPrice.classList.add('cart__item__content__titlePrice');
    
                    const titlePrice = document.createElement('h2');
                    divContentPrice.appendChild(titlePrice);
                    titlePrice.innerHTML = `${panier[i].name}`;
    
                    const price = document.createElement('p');
                    divContentPrice.appendChild(price);
                    price.innerHTML = `${panier[i].price}` + ",00 €"
                    let priceValue = parseInt(price.innerHTML); // transforme le prix HTML en nombre
    
                const divSettings = document.createElement('div');
                divContent.appendChild(divSettings);
                divSettings.classList.add('cart__item__content__settings');
                    
                    const divSettingsColor = document.createElement('div');
                    divSettings.appendChild(divSettingsColor);
                    divSettingsColor.classList.add('cart__item__content__settings__color');

                        const settingColor = document.createElement('p');
                        divSettingsColor.appendChild(settingColor);
                        settingColor.innerHTML = "Couleur : " + `${panier[i].color}` ;
    
                    const divSettingsQty = document.createElement('div');
                    divSettings.appendChild(divSettingsQty);
                    divSettingsQty.classList.add('cart__item__content__settings__quantity');
    
                        const settingQty = document.createElement('p');
                        divSettingsQty.appendChild(settingQty);
                        settingQty.innerHTML = "Qté :";

                        const inputQty = document.createElement('input');
                        divSettingsQty.appendChild(inputQty);
                        inputQty.setAttribute('type', "number");
                        inputQty.setAttribute('name', "itemQuantity");
                        inputQty.setAttribute('min', "1");
                        inputQty.setAttribute('max', "100");
                        inputQty.setAttribute('value', `${panier[i].quantity}`);
                        inputQty.value = `${panier[i].quantity}` ;
                        inputQty.classList.add("itemQuantity");
                        let qtyValue = parseInt(inputQty.value); // transforme la valeur de quantité en nombre
    
                    const divSettingsDelete = document.createElement('div');
                    divSettings.appendChild(divSettingsDelete);
                    divSettingsDelete.classList.add('cart__item__content__settings__delete');
    
                        const deleteItem = document.createElement('p');
                        divSettingsDelete.appendChild(deleteItem);
                        deleteItem.classList.add("deleteItem");
                        deleteItem.innerHTML = "Supprimer";
        
    
        let prixSelonQty = qtyValue * priceValue;
        price.innerHTML = prixSelonQty + " € "

        const totalQuantity = document.getElementById('totalQuantity');
        totalQty.push(qtyValue);
        const reducer = (acc, cur) => acc + cur;
        totalQuantity.innerHTML = totalQty.reduce(reducer);

        const totalPrice = document.getElementById('totalPrice');
        totalPrix.push(prixSelonQty);
        totalPrice.innerHTML = totalPrix.reduce(reducer);

     };
  };

/**************** INTERACTIVITE QUAND L'UTILISATEUR MODIFIE LA QUANTITE OU SUPPRIME UN PRODUIT **********************/

let articles = document.querySelectorAll('.cart__item');

let suppr = document.getElementsByClassName("deleteItem");

let qty = document.querySelectorAll('.itemQuantity');

for (let i = 0 ; i < articles.length; i ++){
      
    qty[i].addEventListener("change",function(){ 
        // le changement de quantité par l'utilisateur met à jour la quantité 
        // dans le localstorage

        let newQty = qty[i].value; // valeur saisie par l'utilisateur
        panier[i].quantity = newQty // modif de la valeur de quantité du panier par celle saisie
        localStorage.setItem("product", JSON.stringify(panier)); // MAJ du localstorage
        location.reload(); // recharger page
          
    });
    
    suppr[i].addEventListener("click", function(){

        //cliquer sur l'élément "supprimer" met à jour le localstorage

        panier.splice(i,1); // suppression de l'élément i dans le panier
        localStorage.setItem("product", JSON.stringify(panier)); // MAJ du localstorage
        window.alert("Le produit a bien été supprimé. Le panier va être mis à jour."); // avertissement utilisateur
        location.reload(); // recharger page
    });
};

/************************** VALIDATION DES DONNEES DU FORMULAIRE **********************/
//envoi du formulaire
let btnCommander = document.getElementById('order');

btnCommander.addEventListener('click', function(e){
    let form = document.getElementsByTagName('form')[0].elements;

    let regexSimple = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
    let regexEmail = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //prénom
    let prenom = document.getElementById('firstName');
    let prenomValue = prenom.value;
    let errorPrenom = document.getElementById('firstNameErrorMsg');
    let prenomRegex = regexSimple.test(prenomValue);

    //nom
    let nom = document.getElementById('lastName');
    let nomValue = nom.value;
    let errorNom = document.getElementById('lastNameErrorMsg');
    let nomRegex =  regexSimple.test(nomValue);

    //adresse
    let adresse = document.getElementById('address');
    let adresseValue = adresse.value;
    let errorAdresse = document.getElementById('addressErrorMsg');

    //ville
    let ville = document.getElementById('city');
    let villeValue = ville.value;
    let errorVille = document.getElementById('cityErrorMsg');
    let villeRegex = regexSimple.test(villeValue);

    //email
    let email = document.getElementById('email');
    let emailValue = email.value;
    let errorEmail = document.getElementById('emailErrorMsg');
    let emailRegex = regexEmail.test(emailValue);

    for (let i = 0 ; i < form.length ; i ++){
        if(!prenomRegex){
            errorPrenom.innerHTML = "Veuillez saisir votre prénom";
        } else{
            errorPrenom.innerHTML = "";
        };
        if(!nomRegex){
            errorNom.innerHTML = "Veuillez saisir votre nom";
        } else{
            errorNom.innerHTML = "";
        };
        if(!villeRegex){
            errorVille.innerHTML = "Veuillez saisir votre ville";
        } else{
            errorVille.innerHTML = "";
        };

        if(adresse.value === ""){
            errorAdresse.innerHTML = "Veuillez saisir votre adresse";
        } else{
            errorAdresse.innerHTML = "";
        };
        if(!emailRegex){
            errorEmail.innerHTML = "Veuillez saisir une adresse mail valide";
        } else{
            errorEmail.innerHTML = "";
        };
        // if(prenomRegex && nomRegex && adresse.value != "" && villeRegex && emailRegex){
        //     console.log("cool");
        // }

    };
    if(prenomRegex && nomRegex && adresseValue != "" && villeRegex && emailRegex){
        let contact = {
            prenomValue,
            nomValue,
            adresseValue,
            villeValue,
            emailValue
        }
    localStorage.setItem("commande", JSON.stringify(contact));
    }

});


/*
    Objectif : 
        la possibilité, sur la page Panier, de saisir vos coordonnées puis de
        confirmer votre commande

    Recommandations : 
        Récupérer et analyser les données saisies par l’utilisateur dans le
        formulaire.
        Afficher un message d’erreur si besoin (par exemple lorsqu’un
        utilisateur renseigne “bonjour” dans le champ “e-mail”).
        Constituer un objet contact (à partir des données du formulaire) et
        un tableau de produits.

*/