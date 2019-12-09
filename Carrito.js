"use strict"
var finalPrice=0;

var urlProducts="http://localhost:3000/api/Productos/"
var itemRequest = new XMLHttpRequest();

function loadCart(){
    let index=localStorage.getItem("index");
    if(index===null){
        console.log("no items!");
        return;
    }

    for(let i=0;i<index;i++){
        let item=localStorage.getItem("cartItem"+i);
        console.log(item);
        if(item!=null){
            itemRequest.open('GET',urlProducts+item,false);
            itemRequest.withCredentials=true;
            console.log(urlProducts);
            itemRequest.setRequestHeader('Content-Type','application/json');
            itemRequest.addEventListener("readystatechange",checkItem);
            itemRequest.send();
        }
    }

    /*
    <tr>
            <td>
                Product&nbsp;&nbsp;&nbsp;<img src="filtro.jpg" alt="" id="producto_jpg">
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary btn-light" data-toggle="modal" data-target="#modelId"
                    style="position: absolute; left: 65%;">
                    Info
                </button>
            </td>
        </tr>
    */
}

function checkItem(){
    if(itemRequest.readyState===XMLHttpRequest.DONE){
        if(itemRequest.status===200||itemRequest.status===304){ //PUEDE SER 200 O 304 QUE ES LA MISMA RESPUESTA
            let respose=JSON.parse(itemRequest.responseText);
            console.log(respose);
            insertItem(respose);
        }
        else{
            console.log("error al cargar articulos!");
        }
    }
}

function insertItem(item){
    console.log(typeof item);
    let cart=document.getElementById("cart");
    cart.insertAdjacentHTML('afterend',`
    <tr id="item">
                <td>
                    ${item.nombre}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src="filtro.jpg" width="10%" height="10%">
                    <p id="itemP">Precio: ${item.costo}</p>
                    <p>Fabricante: ${item.compañia}</p>
                    <button type="button" onclick="removeItem(event,${item.costo},${item.id})" class="btn btn-danger">Remove Item</button> 
                </td>  
            </tr>
        <tr>`);
    updatePrice(item.costo);
}

function updatePrice(price){
    let final=document.getElementById("price");
    finalPrice+=parseInt(price);
    console.log(price);
    final.innerHTML="TOTAL: $"+finalPrice;
}

function removeItem(event,price,itemN){
    let elem=event.target.parentElement;
    updatePrice(-price);
    for(let i=0;i<localStorage.length-1;i++){
        let index=localStorage.getItem("cartItem"+i);
        if(index==itemN){
            //console.log("found!");
            localStorage.removeItem("cartItem"+i);
            break;
        }
    }
    elem.remove();
}

function removeAll(){
    localStorage.removeItem("index");
    location.reload();
}