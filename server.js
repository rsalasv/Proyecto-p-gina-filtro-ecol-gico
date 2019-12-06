'use strict'
//Juan Pablo Ramos Robles 

const express = require('express')
const jwt = require('jsonwebtoken')
const Product=require('./models/product');
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

app.route('/api/Productos')
    .get(async(req,res)=>{
    try{
        const Prod=await Product.find({});
        return res.send(Prod);
    }catch (err){
        return res.status(500).json({message: err.message});
    }
}).post(async (req,res)=>{
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
    .get(getProduct,(req,res)=>{
        console.log(res.product);
        return res.json(res.product)
    })

async function getProduct(req,res,next){
    let product;
    try{
        product=await Product.find({id:req.body.id});
        if(product===null){
            return res.status(404).json({message:'Product Not Found!'});
        }
    }catch(err){
        return res.status(500).json({message:err.message});
    }
    res.product=product;
    next();
}
