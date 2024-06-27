const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId
const Schema = mongoose.Schema

const PedidosSchema = new Schema({
  IdMesa: { type: ObjectId, ref: 'Mesas' },
  IdProducto: [{ type: ObjectId, ref: 'Productos' }],
  IdCliente: { type: ObjectId, ref: 'Clientes' },
  IdUsuario: { type: ObjectId, ref: 'Usuarios' },
  IdRestaurante: { type: ObjectId, ref: 'Restaurantes' },
  /* PROPUESTA PARA AÑADIR PRODUCTOS Y CANTIDADES AL PEDIDO:
    Productos: {type: Map, of: Number, required: true},

    DESPUÉS PODRÍA GUARDARSE CON ESTE FORMATO:
    productos: {
      '60d21b9667d0d8992e610c86': 2, // Reemplaza con ObjectIds válidos de productos
      '60d21b9667d0d8992e610c87': 3
    }
    */
  PrecioTotal: {
    type: Number,
    required: true,
  },
})

const Pedidos = mongoose.model('Pedidos', PedidosSchema)

module.exports = Pedidos
