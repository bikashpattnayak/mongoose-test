const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isbn: { type: String, required: true },
  pageCount: { type: Number, required: true },
  publishedDate: { type: Date, required: true, default: Date.now },
  shortDescription: String,
  longDescription: String,
  authors: [String],
  categories: [String],
});

module.exports = UserSchema;
