const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const errorMsg = (msg) => {
	throw new Error(msg);
};

function createToken(user, SECRET_KEY) {
	const { id, name, username } = user;
	const payload = {
		id,
		name,
		username,
	};
	return jwt.sign(payload, SECRET_KEY);
}

async function login(input) {
	const PASSWORD_ERROR = 'User or Password incorrect.';
	const { username, password } = input;

	const userFound = await User.findOne({ username: username.toLowerCase() });
	if (!userFound) errorMsg(PASSWORD_ERROR);

	const passwordSuccess = await bcryptjs.compare(password, userFound.password);
	if (!passwordSuccess) errorMsg(PASSWORD_ERROR);

	return {
		token: createToken(userFound, process.env.SECRET_KEY),
	};
}

async function getUser(id, username) {
	const USER_NOT_FOUND = 'User does not exist';
	let user = null;
	if (id) user = await User.findById(id);
	if (username) user = await User.findOne({ username });
	if (!user) errorMsg(USER_NOT_FOUND);

	return user;
}

async function register(input) {
	const newUser = input;
	newUser.username = newUser.username.toLowerCase();

	const USER_EXISTS = 'Username is already taken';

	const { username, password } = newUser;

	// Check if Username is taken
	const foundUsername = await User.findOne({ username });
	if (foundUsername) errorMsg(USER_EXISTS);

	// Crypt
	const salt = await bcryptjs.genSaltSync(10);
	newUser.password = await bcryptjs.hash(password, salt);
	newUser.roleName = 'user';

	try {
		const user = new User(newUser);
		user.save();
		return user;
	} catch (error) {
		console.log(error);
	}
	return null;
}

module.exports = {
	login,
	getUser,
	register,
};
