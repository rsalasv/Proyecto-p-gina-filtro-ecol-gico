'use strict'
//JUAN PABLO RAMOS ROBLES 715592

//*********Registro**********/


//PARTE 1, VALIDACION DE ENTRADAS


document.getElementById("registroBtn").disabled = true
let evento = document.querySelector('form')

evento.addEventListener("change", () => {

    let entradas = document.querySelectorAll("#registroM input:invalid")
    if (entradas.length >= 1) document.getElementById("BtnRegistro").disabled = true
    else if (document.getElementById("contra1").value == document.getElementById("contra2").value) document.getElementById("registroBtn").disabled = false
    else document.getElementById("registroBtn").disabled = true
})


//PARTE 2, MANDAR A BACK-END
let registroBtn = document.getElementById("registroBtn")
let datosRegistro

registroBtn.addEventListener("click", function (event) {
    event.preventDefault() //PARA QUE NO SE RECARGUE LA PAGINA

    let nombre = document.getElementById('nombreUsuario').value
    let email = document.getElementById('emailRegistro').value
    let contra1 = document.getElementById('contra1').value
    let contra2 = document.getElementById('contra2').value
    let genero = document.getElementById('genero').value

    datosRegistro = {
        nombre: nombre,
        email: email,
        contraseña: contra2,
        genero: genero
    }

    let StringInfo = JSON.stringify(datosRegistro)

    var linkRegistro = "http://localhost:3000/users" //FALTA PONER EL LINK DE JSON-SERVER

    fetch(linkRegistro, { // mandar los datos del usuario al back-end
            method: 'POST',
            body: [StringInfo],
            headers: {
                'Content-Type': 'application/json'
            }
        })
        //PASO LA RESPUESTA A UN JSON PARA HACERLO ACCESIBLE
        .then(res => res.json())
        .then(() => alert('¡Registro exitoso!'))
        .catch(error => console.error('Error:', error))
})

//**PARA EL INICIO DE SESION NO SE QUE HACER PARA COMPRAR YA EN SESION */

//***++** LOG IN *********/

let log = document.getElementById("loginBtn")
log.addEventListener("click", function (event) {
    event.preventDefault()

    let LogCorreo = document.getElementById("loginCorreo")
    let passwordLogin = document.getElementById("loginContraseña")

    let infoLogin = {
        correo: LogCorreo,
        password: passwordLogin
    }

    let urlLogin = "http://localhost:3000/users"

    fetch(urlLogin, {
            method: 'GET',
            //body: JSON.stringify(infoLogin),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        //EN ESTE CASO COMO NO TENEMOS SERVIDOR VAMOS A SIMULAR QUE TENEMOS UN USUARIO DE ADMIN
        //CREDENCIALES DE ADMIN:
        //EMAIL: admin@hotmail.com
        //PASSWORD: admin
        .then(response => response.json())
        .then(function (func) {
            //SI ERES ADMIN TE MANDA AL HTML QUE MUESTRA TODOS LOS USUARIOS
            if (infoLogin.correo.value === "admin@hotmail.com" && infoLogin.password.value === "admin") {
                window.location.href = "UserManagement.html"
            } else if(infoLogin.correo.value != "" && infoLogin.password.value != ""){
                window.location.href = "ecoFilterUser.html"
            }
            else(console.log("No usuario"))
        })
})