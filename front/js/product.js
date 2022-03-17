let params = new URLSearchParams(document.location.search);
let productId = params.get("id"); //

async function demande() {// asynch (asynchrone = execute toutes les ligne en même temps et peut être mis sur pause grace à await) = fait en sorte d'attendre la réponse de fetch zpès le await
  try {
    const res = await fetch("http://localhost:3000/api/products/" + productId); // réponde de l'API
    let response = await res.json(); // lire réponde de l'API

    //ajout de l'image
    const item__img = document.querySelector(".item__img"); //selection de la class css
    const img = document.createElement("img"); //création de l'image

    // ajout du nom, du prix et de la description
    const title = document.getElementById("title"); // séléctionne l'id demandé
    const pprice = document.getElementById("price"); // séléctionne l'id demandé
    const des = document.getElementById("description"); //séléctionne l'id demandé
    const quant = document.getElementById("quantity");

    // ajout de la couleur
    const opt = document.getElementById("colors"); //ajout des modifications aux couleur

    for (let color of response.colors) {
      //lire les couleur de l'api
      const option = document.createElement("option"); // sélectionner la class option
      const newContent = document.createTextNode(color); //
      option.value = color; // indique la valeur d'option, donc les couleurs
      option.appendChild(newContent); //inclure necContent dans la class option
      opt.appendChild(option); //inclure la couleur dans la constente
    }
    //panier

    const button = document.getElementById("addToCart"); // création du boutton

    button.addEventListener("click", (e) => {
      //création de l'événement au clique de l'ajout du canapé dans le panier
     
      const panier = JSON.parse(localStorage.getItem("items")) || []; // la création du panier || ( localStorage.getItem('panier') permet de récuperer la valeur lié à la clé

      const infoCanap = {
        // création de l'objet contenant les informations du canapé
        id: productId,
        color: opt.value, //valeur de la clé
        quantity: quant.value,
      };
      let otherCanap = true; // si c'est un nouveau canapé, ajout du canapé dans le panier avec la condition ligne 63
      if (infoCanap.quantity < 1) {// condition de de la quantité si inférieur à 1 = on quitte la fonction panier
        alert('quantité incorrecte')
        return;
      }
      if (infoCanap.color ==  "" ) {//condition de de la couleur si elle n'es pas choisit = on quitte la fonction panier
        alert('couleur  incorrecte')

        return;
      }
      

      for (let canape of panier) {
        //
        if (canape.color == infoCanap.color && canape.id == infoCanap.id) { // si les couleurs et l'id sont les mêmes
          //
          otherCanap = false;
          let addition = Number(infoCanap.quantity) + Number(canape.quantity); //addition d'une nouvelle quantité
          canape.quantity = addition; //
        }
      }
      if (otherCanap == true) { // si c'est un nouveau canapé, alors ajout dans le panier
        panier.push(infoCanap);
        alert('ajouter au panier')
      }

      localStorage.setItem("items", JSON.stringify(panier)); //création de la clé dans le locale storage dans laquelle la valeur "panier" est attribubé pour la valeur
    });
    


    img.src = response.imageUrl; //inscription de l'image
    img.alt = response.altTxt; //inscription du alt à l'image
    title.innerHTML = response.name;
    pprice.innerHTML = response.price;
    des.innerHTML = response.description;

    item__img.appendChild(img); //inclure img dans la class

    //canapArray = varriable = modification
    // pouet = fonction = désignation de la modification
    //variable = mofification apporté
    //fonction = déscription des modification
    //for = création d'une boucle de trois éléments
    // const = qui ne se modifie pas

    //     querySelector = sélectionne un element d'une balise
  } catch (error) {
    console.error(error); // message d'erreur si non lecture du fetch
  }
}

demande();
