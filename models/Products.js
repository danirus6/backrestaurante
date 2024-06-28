const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId
const ProductsSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Stock: {
    type: Number,
    required: true,
  },
  Quantity: { //Cantidad de productos pedidos en la comanda
    type: Number,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
    required: true,
  },
  IdRestaurant: [{ type: ObjectId, ref: 'Restaurants' }],
});

const Products = mongoose.model('Products', ProductsSchema);

module.exports = Products;
