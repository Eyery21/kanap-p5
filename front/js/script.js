async function poste()
{try{ // création de la fonction poste avec reception des parametre( id et color )en asynchrone
const res = await  fetch("http://localhost:3000/api/products/")// requete envoyé avec attente de la réponde ( await)
let canapArray = await res.json()// attente du contenu de la réponse


for (const canap  of canapArray) {
  const a  = document.createElement('a')//création du lien
  const article = document.createElement('article')//création de l'article
  const items = document.getElementById('items')//création de l'id
  const img = document.createElement('img')//création de l'image
  const p = document.createElement('p')//création du p
  const h3 = document.createElement('h3')//création de l'h3
  
 
  const productName = document.createElement('productName')// création de la classe h3
  const productDescription = document.createElement("productDescription") // création de la classe p

  a.href ='./product.html?id=' + canap._id;//inscription du lien
  img.src = canap.imageUrl;//inscription de l'image 
  img.alt = canap.altTxt;//inscription du alt à l'image
  p.innerHTML = canap.description;//inscription de la description dans le p
  h3.innerHTML = canap.name;//inscription du nom dans le h3


  items.appendChild(a)// inclure a dans items
  a.appendChild(article)// inclure article dans a
  article.appendChild(img)//inclure img dans article
  article.appendChild(h3)// inclure h3 dans article
  article.appendChild(p)//inclure p dans article
  p.appendChild(productDescription)//inclure la classe dans le p
  h3.appendChild(productName)//inclure la classe dans l'h3
 

  h3.classList.add('productName')//ajout de la classe au h3
  p.classList.add('productDescription')//ajout de la classe au p
}

//canapArray = varriable = modification
// pouet = fonction = désignation de la modification
//variable = mofification apporté
//fonction = déscription des modification
//for = création d'une boucle de trois éléments
// const = modification inchangeable


}
catch (error) {
  console.error(error);// message d'erreur si non lecture du fetch
}
}

poste()// appel de la fonction pouet avec les parramètres id et color









