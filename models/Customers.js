const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId
const Schema = mongoose.Schema

// const ClientesSchema = new Schema(
//   {
//     Nombre: {
//       type: String,
//       required: true,
//     },
//     Email: {
//       type: String,
//       required: true,
//       match: [/.+\@.+\..+/],
//       unique: true,
//     },
//     Password: {
//       type: String,
//       required: true,
//     },
//     Imagen: {
//       type: String,
//     },
//     Token: {
//       type: String,
//     },
//     Confirmado: {
//       type: String,
//       default: 'false',
//     },
//     IdRestaurante: { type: ObjectId, ref: 'Restaurantes' },
//     IdPedido: [{ type: ObjectId, ref: 'Pedidos' }],
//   },
//   { timestamps: true }
// )

// const Clientes = mongoose.model('Clientes', ClientesSchema)

// module.exports = Clientes
const CustomersSchema = new Schema(
  {
    Name: {
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
    Image: {
      type: String,
    },
    Token: {
      type: String,
    },
    Confirmed: {
      type: String,
      default: 'false',
    },
    IdRestaurant: { type: ObjectId, ref: 'Restaurants' },
    IdOrder: [{ type: ObjectId, ref: 'Orders' }],
  },
  { timestamps: true }
)

const Customers = mongoose.model('Customers', CustomersSchema)

module.exports = Customers
