const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MesaSchema = new Schema({
  numero: {
    type: Number,
    required: true,
    unique: true
  },
  capacidad: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['libre', 'ocupada', 'reservada'],
    default: 'libre'
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  pedido: {
    type: Schema.Types.ObjectId,
    ref: 'Pedido'
  }
});

const Mesa = mongoose.model('Mesa', MesaSchema);

module.exports = Mesa;
