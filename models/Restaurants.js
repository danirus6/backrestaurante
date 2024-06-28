//TODO: (ESTO ES PARA QUE DIFERENTES RESTAURANTES TENGAN ACCESO CON LA MISMA WEB)
const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId
const Schema = mongoose.Schema;

const RestaurantsSchema = new Schema({
      Name: {
        type: String,
        required: true,
      },
      Email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/],
        unique: true,
      },
      Tlf: {
        type: Number,
        required: true,
      },
      Street: {
        type: String,
        required: true,
      },
      CP: {
        type: Number,
        required: true,
      },
      City: {
        type: String,
        required: true,
      },
      Province: {
        type: String,
        required: true,
      },
      IdUser: [{ type: ObjectId, ref: 'Users' }],
      IdTable: [{ type: ObjectId, ref: 'Tables' }],
      IdProduct: [{ type: ObjectId, ref: 'Products' }],
    },
    { timestamps: true }
);

const Restaurants = mongoose.model('Restaurants', RestaurantsSchema);

module.exports = Restaurants;