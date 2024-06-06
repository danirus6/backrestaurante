const mongoose = require('mongoose');

const CategoriasSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: false,
  },
});

const Categorias = mongoose.model('Categorias', CategoriasSchema);

module.exports = Categorias;
