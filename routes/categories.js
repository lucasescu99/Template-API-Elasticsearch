const express = require("express");
const router = express.Router();
const Categories = require("../config/db/models/categories");

Categories.createMapping(function(err, mapping) {
  // Map the mongoose model and index the fields to make the search easier
  if (err) {
    console.log("error creating mapping");
    console.log(err);
  } else {
    console.log("mapping created");
    console.log(mapping);
  }
});

var stream = Categories.synchronize(); // Synchronize the mongoose model with the elasticsearch api
var count = 0;

stream.on("data", function() {
  // Subscribe the synchronization so that when you index a mongoose collection the value of the count variable increases
  count++;
});
stream.on("close", function() {
  // When you finish indexing all the elements of the model, say how many index elements
  console.log("Indexed " + count + " documents");
});
stream.on("error", function(err) {
  // If there is an error when indexing, it shows it in the console
  console.log("error", err);
});

router.get("/", (req, res) => {
  Categories.search(
    // *.search* property of elasticsearch to be able to search within its indexes
    {
      query_string: {
        // What kind of query is going to be done (it is one of the most common)
        query: `*${req.query.q}*` // Regular expression to return any item containing the req.query.q that is passed
      }
    },
    function(err, results) {
      if (err) return console.log("Hubo un error");
      let data = results.hits.hits.map(hit => hit); // Way to access the data returned by elasticsearch and thus be able to return it
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
