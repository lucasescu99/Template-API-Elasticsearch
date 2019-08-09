const express = require("express");
const router = express.Router();
const Categories = require("../config/db/models/categories");

Categories.createMapping(function(err, mapping) {
  if (err) {
    console.log("error creating mapping");
    console.log(err);
  } else {
    console.log("mapping created");
    console.log(mapping);
  }
});

var stream = Categories.synchronize();
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
  Categories.search(
    {
      query_string: {
        query: `*${req.query.q}*`,
        fields: ["description"]
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
  Categories.create(req.body)
    .then(categ => res.json(categ))
    .catch(err => res.status(401).send(err));
});

module.exports = router;
