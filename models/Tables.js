const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId
const Schema = mongoose.Schema;

// const MesaSchema = new Schema({
//     Numero: {
//       type: Number,
//       required: true,
//       unique: true
//     },
//     Capacidad: {
//       type: Number,
//       required: true
//     },
//     Estado: {
//       type: String,
//       enum: ['libre', 'ocupada', 'reservada'],
//       default: 'libre'
//     },
//     IdPedido: { type: ObjectId, ref: 'Pedidos'},
//   }, 
//   { timestamps: true }
// );

// const Mesas = mongoose.model('Mesas', MesaSchema);

// module.exports = Mesas;
const TableSchema = new Schema({
    Number: {
      type: Number,
      required: true,
      unique: true
    },
    Capacity: {
      type: Number,
      required: true
    },
    Status: {
      type: String,
      enum: ['free', 'occupied', 'reserved'],
      default: 'free'
    },
    OrderId: { type: ObjectId, ref: 'Orders'},
  }, 
  { timestamps: true }
);

const Tables = mongoose.model('Tables', TableSchema);

module.exports = Tables;
