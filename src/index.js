const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolver');
const { ApolloServer } = require('apollo-server');
require('dotenv').config({ path: '.env' });

function shutdown() {
	process.exit(0);
}
mongoose.connect(
	process.env.MONGODB,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	},
	(err, _) => {
		if (err) {
			console.log('Error connecting to the server.');
		} else {
			server();
		}
	}
);

function server() {
	const serverApollo = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req }) => {
			const token = req.headers.authorization;
			if (token) {
				try {
					const user = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY);
					return {
						user,
					};
				} catch (error) {
					console.log(error);
					throw new Error('Invalid Token');
				}
			}
		},
	});

	serverApollo.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
		process.on('SIGINT', shutdown);
		process.on('SIGTERM', shutdown);
		process.on('SIGHUP', shutdown);
		console.log('\n' + star());
		console.log(`[LISTENING]: Server ready on url: ${url}`);
		console.log(star());
	});
}

function star() {
	let res = '';
	for (let i = 0; i < 100; i++) res += '*';
	return res;
}
