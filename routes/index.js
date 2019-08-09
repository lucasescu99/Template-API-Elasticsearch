const express = require("express");
const router = express.Router();

const prodRoutes = require("./products");
const catRoutes = require("./categories");

router.use("/products", prodRoutes);
router.use("/categories", catRoutes);

module.exports = router;
