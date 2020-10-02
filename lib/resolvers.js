"use strict";
const connectDb = require("./db");
const { ObjectID } = require("mongodb");

const errorHandler = (error) => {
	console.error(error);
	throw new Error("Fallo en la operacion del servidor");
};

let db;
async function main() {
	try {
		db = await connectDb();
	} catch (error) {
		errorHandler(error);
	}
}
main();

const PRODUCTS_COLLECTION = "products";

const query = {
	products: async () => {
		let queryResult;
		try {
			queryResult = await db.collection(PRODUCTS_COLLECTION).find().toArray();
		} catch (error) {
			errorHandler(error);
		}
		return queryResult;
	},
	product: async (_, { _id, sku }) => {
		let queryResult;
		try {
			queryResult = await db
				.collection(PRODUCTS_COLLECTION)
				.findOne(_id ? { _id: ObjectID(_id) } : { sku: sku });
		} catch (error) {
			errorHandler(error);
		}
		return queryResult;
	},
};

module.exports = {
	Query: query,
};
