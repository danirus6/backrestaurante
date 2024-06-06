const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidosSchema = new Schema({
});

module.exports = mongoose.model('Pedidos', PedidosSchema);
