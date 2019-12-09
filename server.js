'use strict'
//Juan Pablo Ramos Robles
//Isaac Eduardo Gauna Blancarte
//Este server.js sirve tanto como router como servidor, tiene todas las rutas y todos los métodos del servidor.

const http=require('http');
const fs=require('fs')
const express = require('express')
const jwt = require('jsonwebtoken')
const path=require('path');
const Product=require('./models/product');
const app = express()
const {
    usuariosModelo,
    crearUsuario,
    deleteUser,
    getUser,
    showUsers
} = require('./Usuarios')
const port = process.env.PORT || 3000;
const url="http://localhost:3000";

app.use(express.json())

app.listen(port, () => console.log(`Conectado a http://localhost:${port}`))

app.route('/')
    .get(async function(req,res){
        res.set({
            'Content-Type':'text/html',
            'X-Content-Type-Options':'nosniff'
        });
        res.sendFile(path.join(__dirname+'/ecoFilter.html'));
});

app.route('/ecoFilter.js')
    .get(async function(req,res){
        res.set({
            'Content-Type':'application/javascript',
            'X-Content-Type-Options':'nosniff'
        });
        res.sendFile(path.join(__dirname+'/ecoFilter.js'));
});

app.route('/ecoFilter.html')
    .get(async function(req,res){
        res.set({
            'Content-Type':'text/html',
            'X-Content-Type-Options':'nosniff'
        });
        res.sendFile(path.join(__dirname+'/ecoFilter.html'));
});

app.route('/Carrito.html')
    .get(async function(req,res){
        res.set({
            'Content-Type':'text/html',
            'X-Content-Type-Options':'nosniff'
        });
        res.sendFile(path.join(__dirname+'/Carrito.html'));
});

app.route('/Carrito.js')
    .get(async function(req,res){
        res.set({
            'Content-Type':'application/javascript',
            'X-Content-Type-Options':'nosniff'
        });
        res.sendFile(path.join(__dirname+'/Carrito.js'));
});

app.route('/ecoFilterUser.html')
    .get(async function(req,res){
        res.set({
            'Content-Type':'text/html',
            'X-Content-Type-Options':'nosniff'
        });
        res.sendFile(path.join(__dirname+'/ecoFilterUser.html'));
});

app.route('/ecoFilterUser.js')
    .get(async function(req,res){
        res.set({
            'Content-Type':'application/javascript',
            'X-Content-Type-Options':'nosniff'
        });
        res.sendFile(path.join(__dirname+'/ecoFilterUser.js'));
});

app.route('/information.html')
    .get(async function(req,res){
        res.set({
            'Content-Type':'text/html',
            'X-Content-Type-Options':'nosniff'
        });
        res.sendFile(path.join(__dirname+'/information.html'));
});

app.route('/UserManagement.html')
    .get(async function(req,res){
        res.set({
            'Content-Type':'text/html',
            'X-Content-Type-Options':'nosniff'
        });
        res.sendFile(path.join(__dirname+'/UserManagement.html'));

});

app.route('/UserManagement.js')
    .get(async function(req,res){
        res.set({
            'Content-Type':'application/javascript',
            'X-Content-Type-Options':'nosniff'
        });
        res.sendFile(path.join(__dirname+'/UserManagement.js'));
});

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

app.route('/api/Productos')
    .post(async (req,res)=>{
    const product= new Product({
        id:req.body.id,
        nombre:req.body.nombre,
        costo:req.body.costo,
        compañia:req.body.compañia
    })
    console.log(req.body);
    try{
        const newProduct=await product.save();
        res.status(201).json(newProduct);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
})

app.route('/api/Productos/:id')
    .get(async(req,res)=>{
        try{
            console.log(req.params.id);
            let Prod=await Product.findOne({"id":req.params.id});
            console.log(Prod);
            return res.status(200).send(Prod);
        }catch (err){
            return res.status(500).json({message: err.message});
        }
    })
