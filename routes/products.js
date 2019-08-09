const express = require("express");
const router = express.Router();
const Products = require("../config/db/models/products");

router.get("/", (req, res) => {
  Products.find().then(prods => res.json(prods));
});

router.post("/", (req, res) => {
  Products.create(req.body)
    .then(prod => res.json(prod))
    .catch(err => res.status(401).send(err));
});

module.exports = router;
