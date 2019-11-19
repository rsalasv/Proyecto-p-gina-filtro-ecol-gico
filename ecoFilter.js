'use strict'
//JUAN PABLO RAMOS ROBLES 715592

//*********Registro**********/


//PARTE 1, VALIDACION DE ENTRADAS

//QUE EL BOTÓN ESTÉ APAGADO A MENOS QUE TODOS LOS CAMPOS ESTÉN LLENOS
document.getElementById("registroBtn").disabled = true
let evento = document.querySelector('form')

//EVENTO DE CHANGE PARA CUANDO CAMBIAN LOS INPUTS
evento.addEventListener("change", () => {

    let entradas = document.querySelectorAll("#registroM input:invalid")
    //CON QUE UNO DE LOS CAMPOS NO ESTÉ LLENO NO SE ACTIVA  
    if (entradas.length >= 1) document.getElementById("BtnRegistro").disabled = true
    else if (document.getElementById("contra1").value == document.getElementById("contra2").value) document.getElementById("registroBtn").disabled = false
    else document.getElementById("registroBtn").disabled = true
})


//PARTE 2, MANDAR A BACK-END
let registroBtn = document.getElementById("registroBtn")
let datosRegistro

//EVENTO DE CLICK QUE SE ACTIVA CUANDO USAS EL BOTON 
registroBtn.addEventListener("click", function (event) {
    event.preventDefault() //PARA QUE NO SE RECARGUE LA PAGINA

    //PASAMOS LOS DATOS DE LOS INPUTS A LAS VARIALBES
    let nombre = document.getElementById('nombreUsuario').value
    let email = document.getElementById('emailRegistro').value
    let contra1 = document.getElementById('contra1').value
    let contra2 = document.getElementById('contra2').value
    let genero = document.getElementById('genero').value


    //LOS VALORES DE LAS VARIABLES LAS PASAMOS A UN OBJETO 
    datosRegistro = {
        nombre: nombre,
        email: email,
        contraseña: contra2,
        genero: genero
    }

    //EL OBJETO CON LA INFORACIÓN DE LOS USUARIOS LO CONVIERTO A JSON
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
/*
PARA EL LOGIN LO TUVMOS QUE HACER DE UNA MANERA EN PARTICULAR, HABLANDO CON EL PROFESOR NOS DIMOS CUENTA QUE COMO TODAVIA NO ESTAMOS
USANDO SERVIDORES NO PODEMOS GENERAR TOKENS CON JSONWEBTOKEN, ASÑI QUE NO TENEMOS MANERA DE IDENTIFICA A CADA UNO DE LOS USUARIOS
TODAIA, LO QUE HICIMOS FUE EL ASIGNAR UN USUARIO Y CLAVE BASE PARA ADMIN QUE AL METER ESOS VALORES ESPECÍFICOS DE HAGA LOGING COMO USER
Y AL USAR CUALQUIER OTROS DATOS TE MANDA COMO SI HICIERAS UN LOGIN DE USUARIO
*/


//EVENTO QUE SE ACTIVA AL DAR CLICK EN LOGIN
let log = document.getElementById("loginBtn")
log.addEventListener("click", function (event) {
    event.preventDefault()

    //PASAMOS LAS ENTRADAS DE LOGIN A VARIABLES
    let LogCorreo = document.getElementById("loginCorreo")
    let passwordLogin = document.getElementById("loginContraseña")

    //PASAMOS LA INFO DE LOS INPUTS A UN OBJETO
    let infoLogin = {
        correo: LogCorreo,
        password: passwordLogin
    }

    


    let urlLogin = "http://localhost:3000/users"//URL QUE USAMOS PARA LOS USUARIOS

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
                //SI ERES ADMIN TE MANDA A LA VENTANA DE ADMIN
                window.location.href = "UserManagement.html"
            } else if(infoLogin.correo.value != "" && infoLogin.password.value != ""){
                //SI NO ERES ADMIN TE MANDA A LA VENTANA DE USUARIO
                window.location.href = "ecoFilterUser.html"
            }
            else(console.log("No usuario"))
        })
})
