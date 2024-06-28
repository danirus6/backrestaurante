const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
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
      Password: {
        type: String,
        required: true,
      },
      Token: {
        type: String,
      },
      Confirmed: {
        type: String,
      },
      IdRestaurant: { type: ObjectId, ref: 'Restaurants' },
      IdOrder: [{ type: ObjectId, ref: 'Orders' }],
    },
    { timestamps: true }
);

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;
