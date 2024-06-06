const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientesSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fecha_nacimiento: { type: Date, required: true },
    genero: { type: String, required: true },
    token: { type: String, required: false },
    pedidos: [{ type: Schema.Types.ObjectId, ref: 'Pedidos' }],
    // referencias: [{ type: Schema.Types.ObjectId, ref: 'Referencias' }],
});

module.exports = mongoose.model('Clientes', ClientesSchema);
