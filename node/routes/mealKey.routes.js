module.exports = app => {
    const mealKey = require("../controllers/mealKey.controller.js");
  
    // Create a new Customer
    app.post("/mealKey", mealKey.create);
  
    // Retrieve all Customers
    app.get("/mealKey", mealKey.findAll);
  
    // Retrieve a single Customer with customerId
    //app.get("/menus/:customer_id", menus.findOne);

    // Retrieve a single Cart with customerId
    app.get("/mealKey/:cart_id", mealKey.findOneWithCart);
  
    // Update a Customer with customerId
    app.put("/mealKey/:customer_id", mealKey.update);
  
    // Delete a Customer with customerId
    app.delete("/mealKey/:id", mealKey.delete);
  
    // Delete a new Customer
    app.delete("/mealKey", mealKey.deleteAll);
  };