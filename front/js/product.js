const requeteId = window.location.search; //récupère l'url en cours de la fenêtre

const recupId = new URLSearchParams (requeteId); // extrait l'id dans la requete url
    
const id = recupId.get("id"); // méthode d'URLSearchParams qui renvoie la première valeur associée au paramètre search 


fetch('http://localhost:3000/api/products/' + id) //requête de l'API avec spécification de l'id du produit s"lectionné à partir de la page d'accueil
    .then(reponse => reponse.json()) // promesse d'un objet js
    .then(fiche => { //contient la réponse à la promesse
   
            document.getElementById('title').innerHTML = `${fiche.name}` //le nom du produit
            document.getElementById('price').innerHTML = `${fiche.price}` //le prix du produit 
            document.getElementById('description').innerHTML = `${fiche.description}` //la description du produit
           
       
            const image = document.createElement('img'); // création d'une balise image
            const itemImage = document.getElementsByClassName('item__img')
            itemImage[0].appendChild(image) // la balise image est enfant de la class item__img
            image.setAttribute('src', `${fiche.imageUrl}`); // src de l'image
            image.setAttribute('alt', `${fiche.altTxt}`); // alt de l'image

           const choixCouleur = fiche.colors

           for (const color of choixCouleur ){ //boucle pour lister les couleurs disponibles
               const choix = document.createElement('option'); //création des balises options
                document.getElementById('colors').appendChild(choix); //les balises options sont enfants de l'id colors
                choix.value = color; // valeur de l'option
                choix.textContent = color ; // texte affiché de l'option
            }

        
    })
    
    .catch(function (err) {
        console.log("pb dans récupération API")
        alert("impossible d'afficher les produits")
    });

   
let addCart = document.getElementById('addToCart'); // variable addCart raccourci pour le bouton "ajouter au panier"

let selectQuantity = document.getElementById('quantity'); // variable selectQuantity raccourci pour la quantité de produit

let selectColor = document.querySelector('select'); // variable selectColor raccourci pour la couleur sélectionnée



addCart.addEventListener('click', function(e) { //écoute bouton addToCart
    let color = selectColor.value; // variable pour la couleur sélectionnée
    let quantity = selectQuantity.value // variable pour la quantité sélectionnée

    let product = {
        id,
        quantity,
        color,
        price
    }; // création d'un objet product

   let products = []; //création d'un tableau vide contenant les produits

   let newProducts = []; // création d'un tableau vide pour les produits ajoutés
    
    products.forEach(ajout => {
            
            if(product.id != ajout.id && product.color != ajout.color){ // si le produit ajouté a un id et une couleur différents du produit déjà présent dans le panier alors...
                newProducts.push(ajout); //ajoute le produit dans le tableau newProducts
            } 
           
        });
    
    newProducts.push(product); // ajoute un objet produit dans le tableau newProducts

    let productLinea = JSON.stringify(newProducts);
    localStorage.setItem("products", productLinea); // transformation de l'objet product en json

    console.log(product);

});
