const express = require("express");
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();
const cors = require("cors");

const { resolvers, typeDefs } = require("./lib");

const server = new ApolloServer({
	typeDefs,
	resolvers,
	introspection: true,
	playground: true,
	context: ({ req }) => {
		const token = req.headers.authorization || "";

		// try to retrieve a user with the token
		if (token === "123") {
			return { loggedIn: true };
		} else {
			throw new AuthenticationError("token incorrecto");
		}
	},
});

const app = express();
app.use(cors());
server.applyMiddleware({
	app,
});

app.listen({ port: process.env.PORT || 4000 }, () =>
	console.log("🚀 Server ready at http://localhost:4000" + server.graphqlPath)
);
