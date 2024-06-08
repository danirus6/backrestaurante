//TODO: (ESTO ES PARA QUE DIFERENTES RESTAURANTES TENGAN ACCESO CON LA MISMA WEB)
const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId
const Schema = mongoose.Schema;

const RestaurantesSchema = new Schema({
      Nombre: {
        type: String,
        required: true,
      },
      Email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/],
        unique: true,
      },
      Telefono: {
        type: Number,
        required: true,
      },
      Calle: {
        type: String,
        required: true,
      },
      CP: {
        type: Number,
        required: true,
      },
      Ciudad: {
        type: String,
        required: true,
      },
      Provincia: {
        type: String,
        required: true,
      },
      IdUsuario: [{ type: ObjectId, ref: 'Usuarios' }],
      IdMesa: [{ type: ObjectId, ref: 'Mesas' }],
      IdProducto: [{ type: ObjectId, ref: 'Productos' }],
    },
    { timestamps: true }
);

const Restaurantes = mongoose.model('Restaurantes', RestaurantesSchema);

module.exports = Restaurantes;