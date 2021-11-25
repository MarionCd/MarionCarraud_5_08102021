/************************** AFFICHAGE DU CONTENU SELON PRODUIT SELECTIONNE **********************/

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

/************************** AJOUT PRODUIT(S) AU LOCALSTORAGE **********************/

let addCart = document.getElementById("addToCart");
addCart.addEventListener(("click"), function (){ // écoute du bouton addcart (pas besoin de réaction par défaut car bouton)
    let color = document.querySelector("select").value // couleur sélectionnée par le client
    let quantity = document.getElementById("quantity").value // quantité sélectionnée par le client
    let price = document.getElementById("price").innerHTML ;
    let name = document.getElementById("title").textContent;
    let imageURL = document.querySelectorAll('.item__img img')[0].src
    
    product = {
        id,
        color,
        quantity,
        price,
        name,
        imageURL
    }; // enregistre les données dans objet product

    let doublon = false; // considérons que ce n'est pas un doublon
    let produitStocke

    if(localStorage.getItem("product") === null){ 
        produitStocke = [] // si localstorage est vide alors créé un tableau vide
    } else {
        produitStocke = JSON.parse(localStorage.getItem("product")); // sinon ajoute au localstorage
    };

    if(color == "" && quantity === "0"){
        window.alert("Veuillez sélectionner une couleur et une quantité");
    } else if(color == "" && quantity != "0"){
        window.alert("Veuillez sélectionner une couleur");
    } else if(color !== "" && quantity === "0"){
        window.alert("Veuillez sélectionner une quantité");
    } else if(color !== "" && quantity != "0"){
        
        produitStocke.forEach((element) => {
            if(product.id === element.id && product.color === element.color){
                element.quantity = product.quantity; // modifie la quantité de l'élément
                doublon = true;
                window.alert("Quantité mise à jour")
            }
        });

        if(!doublon){
            let newProduct = {
                id,
                color,
                quantity,
                price,
                name,
                imageURL
            };  
            produitStocke.push(newProduct);
            window.alert("Nouveau produit ajouté au panier");
        };
        localStorage.setItem("product", JSON.stringify(produitStocke));
    };
});