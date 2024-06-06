const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidosSchema = new Schema({
  id_mesa: {
    type: Number,
    required: true
  },
  id_usuario: {
    type: Number,
    required: true
  },
  fecha_pedido: {
    type: Date,
    default: Date.now
  },
  estado_pedido: {
    type: String,
    required: true,
    enum: ['pendiente', 'en_preparacion', 'listo', 'entregado'] //REVISAR
  },
  total_pedido: {
    type: Number,
    required: true
  },
  detalle_pedido: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('Pedidos', PedidosSchema);
