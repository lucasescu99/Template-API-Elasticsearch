"use strict";
const mongoose = require("../index");
var mongoosastic = require("mongoosastic"); //Client connecting mongoose with elasticsearch

const Schema = mongoose.Schema;

const categorieSchema = new Schema({
  image: { type: String },
  description: { type: String}
});

// Elasearch plugin connection to have specific properties of this functionality
categorieSchema.plugin(mongoosastic, { 
  hosts: ["localhost:9200"]
});

const Categories = mongoose.model("categories", categorieSchema);

module.exports = Categories;
