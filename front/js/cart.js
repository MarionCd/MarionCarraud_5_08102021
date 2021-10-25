fetch("http://localhost:3000/api/products") //requête de l'API pour demander l'ensemble des produits.
    .then(reponse => reponse.json()) // promesse d'un objet js
    .then(data => { //contient la réponse à la promesse

        const section = document.getElementById('cart__items');

        const article = document.createElement('article');
        section.appendChild(article);
        article.setAttribute('class', "cart__item");
        article.setAttribute('data-id', "id"); // intégrer l'id du produit sélectionné

        const divImg = document.createElement('div');
        article.appendChild(divImg);
        divImg.setAttribute('class', "cart__item__img");

        const imgProduct = document.createElement('img');
        divImg.appendChild(imgProduct);
        imgProduct.setAttribute('src', `./images/product01.jpg`); //intégrer l'image du produit sélectionné
        imgProduct.setAttribute('alt', "Photographie d'un canapé"); // intégrer alt lié au bon produit

        const divContent = document.createElement('div');
        article.appendChild(divContent);
        divContent.setAttribute('class', "cart__item__content");

        const divPrice = document.createElement('div');
        divContent.appendChild(divPrice);
        divPrice.setAttribute('class',"cart__item__content__titlePrice");

        const titreProduit = document.createElement('h2');
        divPrice.appendChild(titreProduit);
        titreProduit.innerHTML = "Nom du produit"; // intégrer le nom du produit

        const price = document.createElement('p');
        divPrice.appendChild(price);
        price.innerHTML = "42,00 €"; //intégrer le prix du produit

        const divSettings = document.createElement('div');
        divContent.appendChild(divSettings);
        divSettings.setAttribute('class', "cart__item__content__settings");

        const settingsQuantity = document.createElement('div');
        divSettings.appendChild(settingsQuantity);
        settingsQuantity.setAttribute('class', "cart__item__content__settings__quantity");

        const txtQuantity = document.createElement('p');
        settingsQuantity.appendChild(txtQuantity);
        settingsQuantity.innerHTML = "Qté : "; 

        const nbQuantity = document.createElement('input');
        settingsQuantity.appendChild(nbQuantity);
        nbQuantity.setAttribute('type', "number"); 
        nbQuantity.setAttribute('class', "itemQuantity");
        nbQuantity.setAttribute('name', "itemQuantity");
        nbQuantity.setAttribute('min', "1"); 
        nbQuantity.setAttribute('max', "100");
        nbQuantity.setAttribute('value', "42"); // intégrer la quantité

        const supprimer = document.createElement('div');
        divSettings.appendChild(supprimer);
        supprimer.setAttribute('class', "cart__item__content__settings__delete");

        const supprimerTxt = document.createElement('p');
        supprimer.appendChild(supprimerTxt);
        supprimerTxt.setAttribute('class', "deleteItem");
        supprimerTxt.innerHTML = "Supprimer"; 
        
    })
    
    .catch(function (err) {
        console.log("pb dans récupération API")
        alert("impossible d'afficher les produits")
    });

  let recupStorage = localStorage.getItem('products');
    console.log(localStorage);