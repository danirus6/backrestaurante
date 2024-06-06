const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuariosSchema = new Schema({

});

module.exports = mongoose.model('Usuarios', UsuariosSchema);
