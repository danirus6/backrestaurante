const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId
const Schema = mongoose.Schema;

const ClientesSchema = new Schema({
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
      Password: {
        type: String,
        required: true,
      },
      Imagen: {
        type: String,
      },
      Token: {
        type: String,
      },
      Confirmado: {
        type: String,
      },
      IdRestaurante: { type: ObjectId, ref: 'Restaurantes' },
      IdPedido: [{ type: ObjectId, ref: 'Pedidos' }],
    },
    { timestamps: true }
);

const Clientes = mongoose.model('Clientes', ClientesSchema);

module.exports = Clientes;
