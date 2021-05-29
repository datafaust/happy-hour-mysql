const cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");
const port = 3008;

const app = express();
app.use(cors()); 

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PITAPAL application." });
});

require("./routes/customer.routes.js")(app);
require("./routes/cart.routes.js")(app);
require("./routes/menu.routes.js")(app);
require("./routes/mealKey.routes.js")(app);

// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//USE FOR REFERENCE
//https://github.com/bezkoder/nodejs-express-mysql/blob/master/app/controllers/customer.controller.js