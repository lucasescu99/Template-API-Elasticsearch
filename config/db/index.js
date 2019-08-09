"use strict";
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/lumartex-db", { useNewUrlParser: true });

module.exports = mongoose;
