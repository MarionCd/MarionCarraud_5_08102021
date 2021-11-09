if(!localStorage.getItem("product")) {
    console.log("Veuillez ajouter des produits au panier")
    //emptyCart()
  } else {
    console.log("c'est parti !");
  };

//function emptyCart(){ window.alert("il n'y a rien dans le panier pour le moment :(")};
let section = document.getElementById("cart__items");

let panier = JSON.parse(localStorage.getItem("product"));



for (let i = 0; i < panier.length; i++) {
    console.log("coucou");
    console.log(panier[i].id);

    const article = document.createElement('article');
    section.appendChild(article);
    article.classList.add("cart__item");
    article.setAttribute('data-id', `${panier[i].id}`);

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
                    settingQty.innerHTML = "Qté :"

                    const inputQty = document.createElement('input');
                    divSettingsQty.appendChild(inputQty);
                    inputQty.setAttribute('type', "number");
                    inputQty.setAttribute('name', "itemQuantity");
                    inputQty.setAttribute('min', "1");
                    inputQty.setAttribute('max', "100");
                    inputQty.value = `${panier[i].quantity}`;
                    inputQty.classList.add("itemQuantity");

                const divSettingsDelete = document.createElement('div');
                divSettings.appendChild(divSettingsDelete);
                divSettingsDelete.classList.add('cart__item__content__settings__delete');

                    const deleteItem = document.createElement('p');
                    divSettingsDelete.appendChild(deleteItem);
                    deleteItem.classList.add("deleteItem");
                    deleteItem.innerHTML = "Supprimer";

 }
