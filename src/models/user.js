const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
	name: {
		type: String,
		require: true,
	},
	username: {
		type: String,
		require: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		trim: true,
		require: true,
	},
	createAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('User', UserSchema);
