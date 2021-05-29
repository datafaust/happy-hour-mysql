module.exports = app => {
    const menus = require("../controllers/menu.controller.js");
  
    // Create a new Customer
    app.post("/menus", menus.create);
  
    // Retrieve all Customers
    app.get("/menus", menus.findAll);
  
    // Retrieve a single Customer with customerId
    //app.get("/menus/:customer_id", menus.findOne);

    // Retrieve a single Cart with customerId
    app.get("/menus/:cart_id", menus.findOneWithCart);
  
    // Update a Customer with customerId
    app.put("/menus/:customer_id", menus.update);
  
    // Delete a Customer with customerId
    app.delete("/menus/:id", menus.delete);
  
    // Delete a new Customer
    app.delete("/menus", menus.deleteAll);
  };