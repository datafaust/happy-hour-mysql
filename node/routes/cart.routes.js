module.exports = app => {
    const carts = require("../controllers/cart.controller.js");
  
    // Create a new Customer
    app.post("/carts", carts.create);
  
    // Retrieve all Customers
    app.get("/carts", carts.findAll);
  
    // Retrieve a single Customer with customerId
    //app.get("/carts/:customer_id", carts.findOne);

    // Retrieve a single Cart with customerId
    app.get("/carts/:customer_id", carts.findOneWithCustomer);
  
    // Update a Customer with customerId
    app.put("/carts/:customer_id", carts.update);
  
    // Delete a Customer with customerId
    app.delete("/carts/:id", carts.delete);
  
    // Delete a new Customer
    app.delete("/carts", carts.deleteAll);
  };