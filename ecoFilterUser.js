'use strict'
//ISAAC GAUNA BLANCARTE 713903 (AGREGAR PRODUCTOS AL CARRITO DE COMPRAS)

let urlCarrito = "http://localhost:3000/carrito"
let urlProductos = "http://localhost:3000/products"
let cart={products:[],size:0}
let cartIndex;
if(localStorage.getItem("index")===null)
    cartIndex=1;
else
    cartIndex=localStorage.getItem("index");

function addFilter(event){
    let cartItem={id:""}
    let item=event.target;
    if(item===document.getElementById("product1"))
        cartItem.id=0;
    else if (item===document.getElementById("product2"))
        cartItem.id=1;
    //POR EL MOMENTO ES UN CARRITO UNIVERSAL YA QUE NO TENEMOS UN TOKEN PARA IDENTIFICAR AL USUARIO, LA INFO DEL CARRITO SE
    //ALMACENA EN LOCAL-STORAGE EL ID DEL ITEM PARA USARLO EN EL CARRITO Y AHÍ HACE EL GET DEL SERVIDOR
   localStorage.setItem("cartItem"+cartIndex,cartItem.id);
   localStorage.setItem("index",cartIndex);
   cartIndex++;
   alert("Articulo agregado al carrito!");
}
