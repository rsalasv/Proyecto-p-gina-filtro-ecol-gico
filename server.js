'use strict'
//Juan Pablo Ramos Robles 

const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const {
    usuariosModelo,
    crearUsuario,
    deleteUser,
    getUser,
    showUsers
} = require('./Usuarios')
const port = 3000
app.use(express.json())
app.listen(port, () => console.log(`Conectado a http://localhost:${port}`))


app.route('/users')

    .get(async (req, res) => {
        let users = await showUsers()
        console.log(users)
        return res.status(200).send(users)
    })

    .post(async (req, res) => {
        console.log(req.body);
        let usuario = usuariosModelo(req.body)
        
        jwt.sign({usuario}, 'secretKey', (err,token) =>{
            res.json({
                message: 'Se creo el token',
                token: token//checa esta parteeeee
            })
        })
         await crearUsuario(usuario)
         res.status(200).send(req.body)
    })

app.route('/users:id')
    .delete((req, res) => {
        console.log(req.params.id);
        let resultado = deleteUser(req.params.id)
        if (resultado == 1) {
            return res.status(400).send("No se eliminó el usuario")
        } else {
            return res.status(200).send(' Se eliminó al usuario correctamente')
        }
    })

    .get(async (req, res) => {
        res.send("Funcionó el GET2")
    })
    
app.route('/api/Login')
    .post(verifyToken,(req,res) =>{
        jwt.verify(req.token, 'secretKey', (err, authData) =>{
            if(err){
                return res.sendStatus(403)
            }
            else{
                res.json({
                    message: 'Created post',
                    authData
                })
            }
        })
    })

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== undefined){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next();
    }
    else{
        req.sendStatus(403)
    }
}

