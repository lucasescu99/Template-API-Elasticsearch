const express = require("express");
const router = express.Router();
const Products = require("../config/db/models/products");
Products.createMapping(function(err, mapping) {
  if (err) {
    console.log("error creating mapping");
    console.log(err);
  } else {
    console.log("mapping created");
    console.log(mapping);
  }
});

var stream = Products.synchronize();
var count = 0;

stream.on("data", function() {
  count++;
});
stream.on("close", function() {
  console.log("Indexed " + count + " documents");
});
stream.on("error", function(err) {
  console.log("error", err);
});

router.get("/", (req, res) => {
  Products.search(
    {
      query_string: {
        query: `*${req.query.q}*`,
        fields: ["partNumber", "name"]
      }
    },
    function(err, results) {
      if (err) return console.log("Hubo un error");
      let data = results.hits.hits.map(hit => hit);
      res.json(data);
    }
  );
});

router.post("/", (req, res) => {
  Products.create(req.body)
    .then(prod => res.json(prod))
    .catch(err => res.status(401).send(err));
});

module.exports = router;
