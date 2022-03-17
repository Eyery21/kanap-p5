pan();
async function pan() {
  const panier = JSON.parse(localStorage.getItem("items")); // la création d'une variable contenant les informations du locale storage || ( localStorage.getItem('panier') permet de récuperer la valeur lié à la clé
 if(!panier){
        return
    }
  for (let canape of panier) {
   
    const res = await fetch("http://localhost:3000/api/products/" + canape.id); // réponde de l'API
    let response = await res.json(); // lire réponde de l'API

    const section = document.getElementById("cart__items"); // récupère de la class / 'cart__items est un string = une chaine de caractère
    const article = document.createElement("article"); //création de l'article
    const divImg = document.createElement("div"); //création de la div
    const img = document.createElement("img"); //création de l'image
    const divContent = document.createElement("div"); //création de la div
    const divDesc = document.createElement("div"); //création de la div
    const h2 = document.createElement("h2"); //création du h2
    const pColor = document.createElement("p"); //création du p
    const pPrice = document.createElement("p"); // création du p
    const divSett = document.createElement("div"); //création du div
    const divQty = document.createElement("div"); //création du div
    const pQty = document.createElement("p"); //création du p
    const input = document.createElement("input"); //création de l'input
    const divDel = document.createElement("div"); //création du p
    const pDel = document.createElement("p"); //création du p


    img.src = response.imageUrl; // inscription de l'image
    img.alt = response.altTxt; //inscription du alt de l'image
    h2.textContent = response.name; //inscription du nom
    pColor.textContent = canape.color; //inscription de la couleur
    pPrice.textContent = response.price + " €"; //inscription du prix
    pQty.textContent = "Qté : "; //inscription de da quantité

    article.classList.add("cart__item"); //ajout de la classe à l'article
    divImg.classList.add("cart__item__img"); // ajout de la classe au div
    divContent.classList.add("cart__item__content"); // ajout de la classe au div
    divDesc.classList.add("cart__item__content__description"); //ajout de la classe au div
    divSett.classList.add("cart__item__content__settings"); //ajout de la classe au div
    divQty.classList.add("cart__item__content__settings__quantity"); //ajout de la classe au div
    divDel.classList.add("cart__item__content__settings__delete"); //ajout de la classe au div
    pDel.classList.add("deleteItem"); //ajout de la classe au p
    input.classList.add("itemQuantity"); //ajout de la classe à l'input

    // *************************************************************************************************************************
    //récupération des informations des donnés demander à l'api
    article.dataset.id = canape.id;
    article.dataset.color = canape.color;
    input.type = "number";
    input.name = "itemQuantity";
    input.min = "1";
    input.max = "100";
    input.value = canape.quantity;

    pDel.addEventListener("click", async () => {
      // reprise de la constante du bouton et lui créer un évenement au click

      if (confirm("êtes-vous sûr de vouloir supprimer votre panier ?")) {
        //
        section.removeChild(article); //
        const items = JSON.parse(localStorage.getItem("items")); // récupère les donnés de la clé
        const filtered = items.filter(
          (data) => data.id != canape.id && canape.color != data.color
        ); // vérifie que les donnés demandés à supprimer correspondent avec la clé
        //
        localStorage.setItem("items", JSON.stringify(filtered)); // modifie les donnés de la clé
        await total();
      }
    });
    input.addEventListener("change", async () => {
      const items = JSON.parse(localStorage.getItem("items")); // récupère les donnés de la clé
      const newCanape = items.find(
        (data) => data.id == canape.id && data.color == canape.color
      );
      newCanape.quantity = Number(input.value);

      localStorage.setItem("items", JSON.stringify(items));
      await total();
    });

    section.appendChild(article); // inclure article dans section
    article.appendChild(divImg); // inclure div dans article
    divImg.appendChild(img); // inclure img dans div
    article.appendChild(divContent); // inclure div dans article
    divContent.appendChild(divDesc); // inclure divdesc dans div cont
    divDesc.appendChild(h2); // inclure h2 dans divdesc
    divDesc.appendChild(pColor); // inclure p dans divdesc
    divDesc.appendChild(pPrice); // inclure pprice dans div
    divContent.appendChild(divSett); // inclure divset dans divcont
    divSett.appendChild(divQty); // inclure divq dans divset
    divQty.appendChild(pQty); // inclure pq dans divq
    divQty.appendChild(input); // inclure imput dans divq
    divSett.appendChild(divDel); // inclure divdel dans divset
    divDel.appendChild(pDel); // inclure pdel dans divdel

    await total(); // appel de
  }
}

async function getDataById(id) {
  let url = `http://localhost:3000/api/products/${id}`;

  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

async function total() {
  //
  const panier = JSON.parse(localStorage.getItem("items")); // la création d'une variable contenant les informations du locale storage || ( localStorage.getItem('panier') permet de récuperer la valeur lié à la clé

  let quantity = 0; //
  let totalPrice = 0; //

  for (let item of panier) {
    // à droite du of se situe un tableau, à gauche se trouve la variable contenant les lignes du tableau ligne par ligne
    let data = await getDataById(item.id);
    totalPrice += Number(item.quantity) * Number(data.price);
    quantity += Number(item.quantity); //pour accéder aux propriété d'un objet; j'appel l'objet.le paramètre
  }

  document.getElementById("totalPrice").textContent = totalPrice;
  document.getElementById("totalQuantity").textContent = quantity;
}

//************** */
//remplissage du formulaire
const submit = document.getElementById("order"); //récupère l'id de l'input

submit.addEventListener("click", (e) => {
  //écoute l'évenement au click
  e.preventDefault(); //empêche le rafraichissement de la page
  if (regex() === false) {
    //
    const panier = JSON.parse(localStorage.getItem("items")); // la création d'une variable contenant les informations du locale storage || ( localStorage.getItem('panier') permet de récuperer la valeur lié à la clé

    let idProducts = []; //création d'un tableau vide d'id des canpé
    for (let item of panier) // remplissage du tableau id product grace à l'id des items récuperer dans le panier
      idProducts.push(item.id);
    const request = {
      // création de l'objet demander pour la requète avec tous les élements nécessaires
      contact: {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      },
      products: idProducts,
    };
    const options = {
      // création des paramètres du fetch
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        // accepte d'envoyer un json
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:3000/api/products/order", options) //
      .then((response) => response.json())
      .then((data) => {
        //récupère la réponse
        console.log(data);
        // localStorage.clear(); // vider le locastorage
        localStorage.setItem("orderId", data.orderId); // envoie l'order id dans le locale storage

        document.location.href = "confirmation.html"; // redirection vers la page de confirmation
      })
      .catch((err) => {
        alert("Problème avec fetch : " + err.message);
      });
  } else {
    console.log("ko");
  }
});

function regex() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value;

  const erFn = document.getElementById("firstNameErrorMsg");
  const erLn = document.getElementById("lastNameErrorMsg");
  const erAd = document.getElementById("addressErrorMsg");
  const erCi = document.getElementById("cityErrorMsg");
  const erEm = document.getElementById("emailErrorMsg");
  
  erLn.classList.add("firstNameErrorMsg");
  erCi.classList.add("firstNameErrorMsg");
  erEm.classList.add("firstNameErrorMsg");
  erFn.classList.add("firstNameErrorMsg");
  let error = false;

  if (!firstName.match(/^[a-zA-Z]*$/)) {
    erFn.textContent = "erreur dans le formulaire";
    console.log(firstName);

    //
    error = true;
  }
  if (!lastName.match(/^[a-zA-Z]*$/)) {
    console.log(lastName);
    erLn.textContent = "erreur dans le formulaire";

    //
    error = true;
  }
  if (!address.match(/^[a-zA-Z0-9\.\s]*$/)) {
    console.log(address);
    erAd.textContent = "erreur dans le formulaire";

    //
    error = true;
  }
  if (!city.match(/^[a-zA-Z]*$/)) {
    console.log(city);
    erCi.textContent = "erreur dans le formulaire";
    //
    error = true;
  }
  if (!email.match(/^[a-zA-Z0-9\.\_\-\\@]*$/)) {
    console.log(email);
    erEm.textContent = "erreur dans le formulaire";

    //
    error = true;
  }
  return error;
}
//********************************************************************* */
