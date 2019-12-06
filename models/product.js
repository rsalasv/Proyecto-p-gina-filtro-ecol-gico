const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    id: {
        require: true,
        type: String
    },
    nombre: {
        require: true,
        type: String
    },
    costo: {
        require: true,
        type: String
    },
    compañia: {
        require: true,
        type: String
    }
})

module.exports=mongoose.model('Productos',productSchema);