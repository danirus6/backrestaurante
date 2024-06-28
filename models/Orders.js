const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId
const Schema = mongoose.Schema;

// const PedidosSchema = new Schema({
//     IdMesa: { type: ObjectId, ref: 'Mesas' },
//     IdProducto: [{ type: ObjectId, ref: 'Productos' }],
//     Cantidad: [{ type: ObjectId, ref:'Productos'}, { type: Number }],
//     IdCliente: { type: ObjectId, ref: 'Clientes' },
//     IdUsuario: { type: ObjectId, ref: 'Usuarios' },
//     IdRestaurante: { type: ObjectId, ref: 'Restaurantes' },
//     PrecioTotal: {
//         type: Number, required: true
//     }
// });

// const Pedidos = mongoose.model('Pedidos', PedidosSchema);

// module.exports = Pedidos;
const OrdersSchema = new Schema({
    IdTable: { type: ObjectId, ref: 'Tables' },
    IdProducts: [{ type: ObjectId, ref: 'Products' }],
    IdQuantity: [{ type: ObjectId, ref:'Products'}, { type: Number }],
    IdCustomer: { type: ObjectId, ref: 'Customers' },
    IdUser: { type: ObjectId, ref: 'Users' },
    IdRestaurant: { type: ObjectId, ref: 'Restaurants' },
    TotalPrice: {
        type: Number, required: true
    }
});
const Orders = mongoose.model('Orders', OrdersSchema);

module.exports = Orders;
