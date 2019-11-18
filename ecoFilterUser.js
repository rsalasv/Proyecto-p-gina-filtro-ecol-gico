'use strict'
//ISAAC GAUNA BLANCARTE 713903 (AGREGAR PRODUCTOS AL CARRITO DE COMPRAS)

let urlCarrito = "http://localhost:3000/carrito"
let urlProductos = "http://localhost:3000/products"
let cart={products:[],size:0}
let cartIndex=0;

function addFilter(event){
    let cartItem={id:""}
    let item=event.target;
    if(item===document.getElementById("product1"))
        cartItem.id=1;
    else if (item===document.getElementById("product2"))
        cartItem.id=2;
    //POR EL MOMENTO ES UN CARRITO UNIVERSAL YA QUE NO TENEMOS UN TOKEN PARA IDENTIFICAR AL USUARIO, LA INFO DEL CARRITO SE
    //ALMACENA EN LOCAL-STORAGE EL ID DEL ITEM PARA USARLO EN EL CARRITO Y AHÍ HACE EL GET DEL SERVIDOR
   localStorage.setItem("cartItem"+cartIndex,cartItem.id);
   localStorage.setItem("index",cartIndex);
   cartIndex++;
   alert("Articulo agregado al carrito!");
}