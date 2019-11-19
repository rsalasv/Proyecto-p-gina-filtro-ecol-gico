'use stict'
//JUAN PABLO RAMOS ROBLES 715592
let linkDatos = "https://localhost:3000/users"


//********** VISTA DE ADMIN ***********/


//PARA MOSTRAR LOS USUARIOS EN LA VISTA DE ADMING

//EVENTO QUE SE ACTIVA AL DAR CLICK EN EL BOTON DE MOSTRAR USUARIOS
let usersBoton = document.getElementById("usersBtn")
usersBoton.addEventListener("click", function (event) {
    event.preventDefault()

    let urlShowUsers = "http://localhost:3000/users" //LINK PARA ACCEDER A LOS USUARIOS

    //COMO REQUIERIMOS ACCEDES A USUARIOS DEL DB.JSON, USAMOS UN GET
    fetch(urlShowUsers, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(function (JSON) {
            //METO LOS USUARIOS EN UN ARREGLO PARA IR ACCEDIENDO UNO A UNO
            let usuariosArreglo = new Array(JSON.length)

            //HAGO UN CICLO PARA ITERAR DE INICIO A FIN DE LOS USUARIOS
            for (let i = 0; i < JSON.length; i++) {
                /*
                PARA INSERTAR LOS USUARIOS FUE UN POCO TRABAJOSO PERO SE LOGRÓ, YA TENÍA UNA TABLA VACÍA EN EL HTML ASÍ QUE LO QUE HICE FUE
                CREAR MÁS RENGLONES POR CADA USUARIO Y COLUMNAS PARA SUS CARACTERÍSTICAS DE CADA UNO E IRLAS INSERTANTO CON INSERTADJACENTHRML
                ASÍ POR CADA ITERACIÓN VAS AÑADIENDO DE UNO EN UNO LOS USUARIOS 
                */
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
                //AÑADES A LA TABLA QUE YA TENEMOS EN EL HTML LA INFORMACION DE CADA UNO 
                usuariosId.insertAdjacentHTML('afterend', usuariosArreglo[i])
            }

        })
})


//******** BORRAR USUARIO **********/

/*
ESTOS BOTONES SE MANDAN LLAMAR EL LA SECCION PASADA, AL CREAR LA TABLA CADA UNO DE ELLOS TIENE BOTON DE DELETE Y EDIT
ASÍ QUE POR ESO NO ESTÁ EN UN EVENTO DETERMINADO
*/
function userRemove(event) {
    event.preventDefault()

    //TENEMOS QUE ACCEDER AL ID PARA IDENTIFIAR A LOS USUARIOS, CON ESTO RECORRO LA INFORMACION HASTA LLEGAR A ELLOS
    let actualUser = event.currentTarget.parentElement.previousElementSibling.innerText

    console.log(actualUser)

    let borrarSi = document.getElementById('btnRemove')
    //EVENTO QUE SE HACE CUANDO CLICK EN EL BOTON DE BORRAR
    borrarSi.addEventListener("click", function (event) {
        event.preventDefault()

        let linkBorrar = "http://localhost:3000/users/" + actualUser//LINK A USAR PARA LLEGAR A ESE USUARIO

        //FETCH PARA BORRAR EL USUARIO
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


//IGUAL QUE PARA EDITAR USSUARIOS, ESTA FUNCION ES LLAMADA EN LOS BOTONES CREADOS EN LA TABLA DE MOSTRAR USUARIOS
function editData(event) {
    event.preventDefault()

    //PASAMOS LA INFORMACION DE LOS INPUTS A VARIABBLES 
    let editName = document.getElementById("editName").value
    let editEmail = document.getElementById("editEmail").value
    let editContra1 = document.getElementById("editContra1").value
    let editCotntra2 = document.getElementById("editContra2").value



    //PARA LLENAR EL MODAL ANTES Y MODIFIQUES LOS DATOS 
    //REFERENCIAMOS LA INFORMACION DE CADA USIARIO 
    let actualEmail =
        event.currentTarget.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    console.log(actualEmail)
    let actualPassword =
        event.currentTarget.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    console.log(actualPassword)
    let actualName =
        event.currentTarget.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText
    console.log(actualName)

    //YA QUE TIENES LOS VALORES, LOS INSERTAS EN EL INPUT PARA QUE APAREZCAN UNA VEZ QUE ABRAS EL MODAL COMO PREDETERMINADOS
    document.getElementById("editName").value = actualName
    document.getElementById("editEmail").value = actualEmail
    document.getElementById("editContra1").value = actualPassword
    document.getElementById("editContra2").value = actualPassword

    //CONSEGUIMOS EL ID DE CADA USUARIO A EDITAR
    let actualUser =event.currentTarget.parentElement.previousElementSibling.innerText
    console.log(actualUser)

    //EVENTO QUE SE EJECUTA AL HACER CLICK EN EL BOTON DE EDITAR DE CADA USUARIO
    let updateBtn = document.getElementById("updateBtn")
    updateBtn.addEventListener("click", function (event) {
        event.preventDefault()//PARA QUE NO SE REFRESQUE LA PAGINA

        //PASO A UN OBJETO LA INFORMACION DEL USUARIO
        let newData = {
            nombre: document.getElementById("editName").value,
            email: document.getElementById("editEmail").value,
            contraseña: document.getElementById("editContra2").value
        }

        //PASO EL OBJETO A UN JSON
        let nuevosDatos = JSON.stringify(newData)


        let linkEditar = "http://localhost:3000/users/" + actualUser//LINK PARA ACCEDER AL USUARIO

        //FETCH PARA HACER LA EDICION DEL USUARIO
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
