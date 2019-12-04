'use strict'
//Juan Pablo Ramos Robles 

const express = require('express')
const app = express()
const {
    usuariosModelo,
    crearUsuario,
    deleteUser,
    getUser
} = require('./Usuarios')
const port = 3000

app.use(express.json())

app.listen(port, () => console.log(`Conectado a http://localhost:${port}`))


app.route('/api/EcoFiltro')
    .get(async (req, res) => {
        res.send("Funcionó el GET")
    })

    .post(async (req, res) => {
        console.log(req.body);
        let usuario = usuariosModelo(req.body)
        await crearUsuario(usuario)
        res.status(200).send(req.body)
    })

app.route('/api/EcoFiltro:id')
    .delete((req, res) => {
        console.log(req.params.email);
        let resultado = deleteUser(req.params.id)
        if (resultado == 1) {
            return res.status(200).send("Se eliminó el usuario")
        } else {
            return res.status(400).send('No se eliminó al usuario correctamente')
        }
    })