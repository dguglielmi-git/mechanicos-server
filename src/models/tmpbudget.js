const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose);

const TmpbudgetSchema = Schema({
    client: {
        type: String,
        require: true,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    vehicle: {
        type: String,
    },
    brand: {
        type: String,
    },
    plate: {
        type: String,
    },
    items: [{id: String, quantity: Number, description: String, price: Float, subtotal: Float}],
});

module.exports = mongoose.model('Tmpbudget', TmpbudgetSchema);