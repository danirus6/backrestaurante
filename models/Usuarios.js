const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId
const Schema = mongoose.Schema

const UsuariosSchema = new Schema(
  {
    Nombre: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/],
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Token: {
      type: String,
    },
    Confirmado: {
      type: String,
      default: 'false',
    },
    IdRestaurante: { type: ObjectId, ref: 'Restaurantes' },
    IdPedido: [{ type: ObjectId, ref: 'Pedidos' }],
  },
  { timestamps: true }
)

const Usuarios = mongoose.model('Usuarios', UsuariosSchema)

module.exports = Usuarios
