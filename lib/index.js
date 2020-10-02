const { readFileSync } = require("fs");
const { join } = require("path");

const typeDefs = readFileSync(join(__dirname, "schema.graphql"), "utf-8");

const resolvers = require("./resolvers");

module.exports = {
	typeDefs: typeDefs,
	resolvers: resolvers,
};
