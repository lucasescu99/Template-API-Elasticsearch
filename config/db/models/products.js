"use strict";
const mongoose = require("../index");
const Categories = require("./categories");
var mongoosastic = require("mongoosastic");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  partNumber: { type: String },
  name: { type: String },
  images: { type: [String] },
  description: { type: String },
  specs: { type: String },
  categories: { type: [Schema.Types.ObjectId], ref: "categories" }
});

productSchema.plugin(mongoosastic, {
  hosts: ["localhost:9200"]
});

const Products = mongoose.model("products", productSchema);

module.exports = Products;
