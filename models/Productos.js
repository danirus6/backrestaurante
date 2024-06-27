const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId
const ProductosSchema = new mongoose.Schema({
  Nombre: {
    type: String,
    required: true,
  },
  Descripcion: {
    type: String,
    required: true,
  },
  Precio: {
    type: Number,
    required: true,
  },
  Stock: {
    type: Number,
    required: true,
  },
  Cantidad: { //Cantidad de productos pedidos en la comanda
    type: Number,
    required: true,
  },
  Imagen: {
    type: String,
    required: true,
  },
  Categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorias',
    required: true,
  },
  IdRestaurante: [{ type: ObjectId, ref: 'Restaurantes' }],
});

const Productos = mongoose.model('Productos', ProductosSchema);

module.exports = Productos;
