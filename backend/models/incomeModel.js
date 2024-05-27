const mongoose = require("mongoose");
//! we dont need to import database from db
// BCZ: Connection Pooling: The MongoDB Node.js driver uses connection pooling under the hood. When you call mongoose.connect
// it sets up a connection pool with a default number of connections (typically 5) to the MongoDB server.
// This connection pool is globally accessible within your application.

// const database= require('../database/db');
const INschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    type: {
      type: String,
      default: "income",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 60,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports.default = mongoose.model("Income", INschema);

