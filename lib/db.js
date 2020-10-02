"use strict";

const { MongoClient } = require("mongodb");
const { DB_USER, DB_PASSWD, DB_NAME } = process.env;

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWD}@cluster0.zkwvd.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
let connection;

async function connectDB() {
  if (connection) return connection;

  let client;
  try {
    client = await MongoClient.connect(mongoUrl, {
      useUnifiedTopology: true,
    });
    connection = client.db(DB_NAME);
  } catch (error) {
    console.error("Could not connect to db", mongoUrl, error);
    process.exit(1);
  }

  return connection;
}

module.exports = connectDB;
