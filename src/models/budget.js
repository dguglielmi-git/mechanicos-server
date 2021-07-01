const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose);

const BudgetSchema = Schema({
    branch: {
        type: Number,
        require: true,
    },
    sequence: {
        type: Number,
        require: true,
    },
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
    totalAmount: {
        type: Float,
    },
    issueDate: {
        type: Date,
        default: Date.now(),
    },
    items: [{ id: String, quantity: Number, description: String, price: Float, subtotal: Float }],
});

module.exports = mongoose.model('Budget', BudgetSchema);