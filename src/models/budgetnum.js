const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BudgetNumSchema = Schema({
    name: {
        type: String,
    },
    branch: {
        type: Number,
    },
    sequence: {
        type: Number,
    },
});

module.exports = mongoose.model('Budgetnum', BudgetNumSchema);