"use strict";
const mongoose = require("../index");
var mongoosastic = require("mongoosastic");

const Schema = mongoose.Schema;

const categorieSchema = new Schema({
  image: { type: String },
  description: { type: String, es_indexed: true }
});

categorieSchema.plugin(mongoosastic, {
  hosts: ["localhost:9200"]
});

const Categories = mongoose.model("categories", categorieSchema);

module.exports = Categories;
