function emptyCart(){ 
    window.alert("il n'y a rien dans le panier pour le moment :(")
};

let section = document.getElementById("cart__items");

let panier = JSON.parse(localStorage.getItem("product"));

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
    
                const divSettings = document.createElement('div');
                divContent.appendChild(divSettings);
                divSettings.classList.add('cart__item__content__settings');
    
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
    
                    const divSettingsDelete = document.createElement('div');
                    divSettings.appendChild(divSettingsDelete);
                    divSettingsDelete.classList.add('cart__item__content__settings__delete');
    
                        const deleteItem = document.createElement('p');
                        divSettingsDelete.appendChild(deleteItem);
                        deleteItem.classList.add("deleteItem");
                        deleteItem.innerHTML = "Supprimer";
          
     };
  };

let articles = document.querySelectorAll('.cart__item');

let article = document.getElementsByClassName("cart__item")

let suppr = document.getElementsByClassName("deleteItem");

let qty = document.querySelectorAll('.itemQuantity');

for (let i = 0 ; i < articles.length; i ++){
      
    qty[i].addEventListener("change",function(){ 
        // le changement de quantité par l'utilisateur met à jour la quantité 
        // dans le localstorage

        let newQty = qty[i].value; // valeur saisie par l'utilisateur
        panier[i].quantity = newQty // modif de la valeur de quantité du panier par celle saisie
        localStorage.setItem("product", JSON.stringify(panier)); // MAJ du localstorage
          
    });
    
    suppr[i].addEventListener("click", function(){

        //cliquer sur l'élément "supprimer" met à jour le localstorage

        panier.splice(i,1); // suppression de l'élément i dans le panier
        localStorage.setItem("product", JSON.stringify(panier)); // MAJ du localstorage
        window.alert("Le produit a bien été supprimé. Le panier va être mis à jour."); // avertissement utilisateur
        location.reload(); // recharger page
    });
};
