//Juan Pablo Ramos Robles 715592
const {
    mongoose
} = require('./mongoConnect')

let usuarioSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    token: {
        type: String
    }
})

//Crear mdelo que requiere del esquema
let usuariosModelo = mongoose.model('Proyecto', usuarioSchema) // Usuarios hace referencia a la coleccion Usuarios en la base de datos de MongoDB

// let nuevoUsuario = {
//     "name": "Juan",
//   "email": "is715592@iteso.mx",
//   "password": "1234",
//   "id": 1
// }

// let usuario = usuariosModelo(nuevoUsuario)

async function crearUsuario(user) {
    let doc = await user.save()
    if (doc) console.log(doc);
}

//crearUsuario(usuario)

function getUser(id) {
    usuariosModelo.find({
        'id': id
    }, (err, docs) => {

        if (docs) {
            return docs
        }
        return
    })
}

async function deleteUser(id) {
    let doc = getUser(id)
    try {
        await usuariosModelo.findOneAndDelete(doc)
    } catch (e) {
        console.log("No se encontró al usuario");
        if (e) {
            return 0
        }
    }
    if (doc) return 1
    else return -1

}

module.exports = {
    usuariosModelo,
    crearUsuario,
    getUser,
    deleteUser
}