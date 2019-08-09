const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const apiRoutes = require("./routes")
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger("tiny"));
app.use("/api", apiRoutes);

app.listen(8080, () => console.log("Server listening at port 8080"));
