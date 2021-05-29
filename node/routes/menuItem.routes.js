module.exports = app => {
    const menuItem = require("../controllers/menuItem.controller.js");
  
    // Create a new Customer
    app.post("/menuItem", menuItem.create);
  
    // Retrieve all Customers
    app.get("/menuItem", menuItem.findAll);
  
    // Retrieve a single Customer with customerId
    //app.get("/menuItem/:customer_id", menuItem.findOne);

    // Retrieve a single Cart with customerId
    app.get("/menuItem/:cart_id", menuItem.findOneWithCart);
  
    // Update a Customer with customerId
    app.put("/menuItem/:customer_id", menuItem.update);
  
    // Delete a Customer with customerId
    app.delete("/menuItem/:id", menuItem.delete);
  
    // Delete a new Customer
    app.delete("/menuItem", menuItem.deleteAll);
  };