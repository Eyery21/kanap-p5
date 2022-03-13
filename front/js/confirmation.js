const idNode = document.getElementById("orderId");//récupère l'lément html qui coréspond au numéro de commande
// add the orderId to the HTML element
idNode.innerText = localStorage.getItem("orderId");// écrit le numéro de commande à partir du localde storage
localStorage.clear();//nettoie le locale storage