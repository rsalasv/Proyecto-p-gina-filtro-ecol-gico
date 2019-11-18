'use stict'
//JUAN PABLO RAMOS ROBLES 715592
let linkDatos = "https://localhost:3000/users"


//MOSTRAR TODOS LOS USUARIOS EN LA VISTA DE ADMIN

let usersBoton = document.getElementById("usersBtn")
usersBoton.addEventListener("click", function (event) {
    event.preventDefault()

    let urlShowUsers = "http://localhost:3000/users"



    fetch(urlShowUsers, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(function (JSON) {

            let usuariosArreglo = new Array(JSON.length)

            for (let i = 0; i < JSON.length; i++) {

                usuariosArreglo[i] =
                    `
                <tr>
                    
                    <td>${JSON[i].nombre}</td>
                    <td>${JSON[i].contraseña}</td>
                    <td>${JSON[i].email}</td>
                    <td>${JSON[i].genero}</td>
                    <td>${JSON[i].id}</td>

                    <td class="text-center">
                        <a href="#" class="btn btn-primary mt-2" id="btnEdit"  data-toggle="modal" data-target="#Edicion" onclick ="editData(event) "><i class="fas fa-pencil-alt edit "></i></a>
                        <a  class="btn btn-primary mt-2" data-toggle="modal" data-target="#Borrar" id="btnRemove" onclick = "userRemove(event)"><i class="fas fa-trash-alt  remove "></i></i></a>
                    </td>
                </tr>
                `
            }
            let usuariosId = document.getElementById("usuariosId")
            for (let i = 0; i < JSON.length; i++) {
                usuariosId.insertAdjacentHTML('afterend', usuariosArreglo[i])
            }

        })
})

//******** BORRAR USUARIO **********/
function userRemove(event) {
    event.preventDefault()

    let actualUser =
        event.currentTarget.parentElement.
    previousElementSibling.innerText

    console.log(actualUser)

    let borrarSi = document.getElementById('btnRemove')

    borrarSi.addEventListener("click", function (event) {
        event.preventDefault()

        let linkBorrar = "http://localhost:3000/users/" + actualUser

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
            .then(response => console.log('Usuario borrado:', response))
    })
}

//*********EDITAR USUARIO *********/

function editData(event) {
    event.preventDefault()

    let editName = document.getElementById("editName").value
    let editEmail = document.getElementById("editEmail").value
    let editContra1 = document.getElementById("editContra1").value
    let editCotntra2 = document.getElementById("editContra2").value



    //PARA LLENAR EL MODAL ANTES Y MODIFIQUES LOS DATOS 

    let actualEmail =
        event.currentTarget.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    console.log(actualEmail)
    let actualPassword =
        event.currentTarget.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    console.log(actualPassword)
    let actualName =
        event.currentTarget.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    console.log(actualName)


    document.getElementById("editName").value = actualName
    document.getElementById("editEmail").value = actualEmail
    document.getElementById("editContra1").value = actualPassword
    document.getElementById("editContra2").value = actualPassword

    // let oldData = {
    //     nombre: editName,
    //     email: editEmail,
    //     contraseña: editCotntra2
    // }
    let actualUser =
        event.currentTarget.parentElement.
    previousElementSibling.innerText
    console.log(actualUser)

    let updateBtn = document.getElementById("updateBtn")
    updateBtn.addEventListener("click", function (event) {
        event.preventDefault()

        let newData = {
            nombre: document.getElementById("editName").value,
            email: document.getElementById("editEmail").value,
            contraseña: document.getElementById("editContra2").value
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