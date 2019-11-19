'use strict'

let linkDatos = "http://localhost:3000/products"


//MOSTRAR TODOS LOS PRODUCTOS EN LA VISTA DE PROVEEDOR

let usersBoton = document.getElementById("productsBtn")
usersBoton.addEventListener("click", function (event) {
    event.preventDefault()

    let urlShowUsers = "http://localhost:3000/products"



    fetch(urlShowUsers, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(function (JSON) {

            let productosArreglo = new Array(JSON.length)

            for (let i = 0; i < JSON.length; i++) {

                productosArreglo[i] =
                    `
                <tr>
                    <th>${JSON[i].nombre}</th>
                    <th>${JSON[i].costo}</th>
                    <th>${JSON[i].compañía}</th>
                    <th>${JSON[i].id}</th>

                    <td class="text-center">
                        <a href="#" class="btn btn-primary mt-2" id="btnEdit"  data-toggle="modal" data-target="#Edicion" onclick ="editData(event) "><i class="fas fa-pencil-alt edit "></i></a>
                        <a  class="btn btn-primary mt-2" data-toggle="modal" data-target="#Borrar" id="btnRemove" onclick = "productRemove(event)"><i class="fas fa-trash-alt  remove "></i></i></a>
                    </td>
                </tr>
                `
            }
            let productosId = document.getElementById("productosId")
            for (let i = 0; i < JSON.length; i++) {
                productosId.insertAdjacentHTML('afterend', usuariosArreglo[i])
            }

        })
})

//******** BORRAR PRODUCTOS **********/
function productRemove(event) {
    event.preventDefault()

    let actualProduct =
        event.currentTarget.parentElement.
    previousElementSibling.innerText

    console.log(actualProduct)

    let borrarSi = document.getElementById('btnRemove')

    borrarSi.addEventListener("click", function (event) {
        event.preventDefault()

        let linkBorrar = "http://localhost:3000/users/" + actualProduct

        fetch(linkBorrar, {
                //AHORA USO DELETE YA QUE LO VOY A BORRAR
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            //ANALISAMOS LA RESPUESTA DEL REQUEST
            .then(res => res.json())
            //SI DA ERROR TE DEVUELTE "ERROR"
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Producto eliminado:', response))
    })
}

//*********EDITAR Producto *********/

function editData(event) {
    event.preventDefault()

    //PARA LLENAR EL MODAL ANTES Y MODIFIQUES LOS DATOS 

    let url =
        event.currentTarget.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    console.log(url)
    let name =
        event.currentTarget.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    console.log(name)
    let price =
        event.currentTarget.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    console.log(price)

    document.getElementById("comp").value = comp
    document.getElementById("url").value = url
    document.getElementById("name").value = name
    document.getElementById("price").value = price

    let actualUser =
        event.currentTarget.parentElement.
    previousElementSibling.innerText
    console.log(actualUser)

    let updateBtn = document.getElementById("updateBtn")
    updateBtn.addEventListener("click", function (event) {
        event.preventDefault()

        let newData = {
            nombre: document.getElementById("name").value,
            costo: document.getElementById("price").value,
            compañía: document.getElementById("comp").value
        }

        let nuevosDatos = JSON.stringify(newData)


        let linkEditar = "http://localhost:3000/users/"+actualUser

        fetch(linkEditar, {
                //USO PUT YA QUE AHORA YO SOY EL QUE METE NUEVA INFO
                method: 'PUT',
                body: [nuevosDatos],
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            //ANALISAS LA RESPUESTA
            .then(res => res.json())
            //LANZA ERROR SI NO PROCEDE
            .catch(error => console.log('Error', error))
            .then(res => console.log(res))

    })


}