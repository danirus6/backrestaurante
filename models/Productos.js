const mongoose = require('mongoose');
const ProductosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorias',
    required: true,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Productos', ProductosSchema);
