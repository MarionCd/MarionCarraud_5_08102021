/************************** RECUP PRODUITS API JSON **********************/

let listeProduits = document.getElementById("items");

fetch("http://localhost:3000/api/products") //requête de l'API pour demander l'ensemble des produits.
    .then(reponse => reponse.json()) // promesse d'un objet js
    .then(produits => { //contient la réponse à la promesse
        for (const produit of produits) {

            const lien = document.createElement('a');
            listeProduits.appendChild(lien);
            lien.setAttribute('href', `./product.html?id=${produit._id}`);

            const article = document.createElement('article');
            lien.appendChild(article);

            const image = document.createElement('img');
            article.appendChild(image);
            image.setAttribute('src', `${produit.imageUrl}`);
            image.setAttribute('alt', `${produit.altTxt}`);

            const titre = document.createElement('h3');
            article.appendChild(titre);
            titre.textContent = `${produit.name}`;

            const paragraphe = document.createElement('p');
            article.appendChild(paragraphe);
            paragraphe.textContent = `${produit.description}`;   
        }
    })
    
    .catch(function (err) {
        console.log("pb dans récupération API")
        alert("impossible d'afficher les produits")
    });