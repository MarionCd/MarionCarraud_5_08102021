if(!localStorage.getItem("product")) {
    console.log("Veuillez ajouter des produits au panier")
    //emptyCart()
  } else {
    console.log("c'est parti !");
  };

//function emptyCart(){ window.alert("il n'y a rien dans le panier pour le moment :(")};

let lecture = localStorage.getItem("product");

let nbProduit = localStorage.length;

console.log(nbProduit);