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
});

const app = express();
app.use(cors());
server.applyMiddleware({
	app,
});

app.listen({ port: process.env.PORT || 4000 }, () =>
	console.log("🚀 Server ready at http://localhost:4000" + server.graphqlPath)
);
