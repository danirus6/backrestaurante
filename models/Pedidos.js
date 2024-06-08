const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId
const Schema = mongoose.Schema;

const PedidosSchema = new Schema({
    IdMesa: { type: ObjectId, ref: 'Mesas' },
    IdProducto: [{ type: ObjectId, ref: 'Productos' }],
    IdCliente: { type: ObjectId, ref: 'Clientes' },
    IdUsuario: { type: ObjectId, ref: 'Usuarios' },
    IdRestaurante: { type: ObjectId, ref: 'Restaurantes' },
});

const Pedidos = mongoose.model('Pedidos', PedidosSchema);

module.exports = Pedidos;
