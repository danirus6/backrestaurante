// const mongoose = require('mongoose');

// const CategoriasSchema = new mongoose.Schema({
//   nombre: {
//     type: String,
//     required: true,
//   },
//   descripcion: {
//     type: String,
//     required: false,
//   },
// });

// const Categorias = mongoose.model('Categorias', CategoriasSchema);

// module.exports = Categorias;
const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const Categories = mongoose.model('Categories', CategoriesSchema);

module.exports = Categories;
