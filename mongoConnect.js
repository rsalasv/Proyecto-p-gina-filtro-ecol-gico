'use strict'
//Juan Pablo Ramos Robles 715592

const mongoose = require('mongoose')
const config = require('./config.json')
let mongoDB = `mongodb+srv://${config.username}:${config.password}@cluster0-ddx7g.mongodb.net/${config.dbname}?retryWrites=true&w=majority`


//console.log(mongoDB)
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then( ()=> {
    console.log('Conectado a la base de datos');
}).catch((err)=>{
    console.log('No conectado a la base de datos',err);
})

module.exports = {mongoose}