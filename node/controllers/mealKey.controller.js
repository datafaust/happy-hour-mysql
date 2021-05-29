const MealKey = require("../models/mealKey.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const mealKey = new Menu({
      cart_id: req.query.cart_id,
      menu_name: req.query.menu_name,
      time_created: req.query.time_created,
    });

    console.log(menu)


    // Save Customer in the database
     MealKey.create(menu, (err, data) => {
         if (err)
             res.status(500).send({
                 message:
                     err.message || "Some error occurred while creating the Customer."
             });
         else res.send(data);
     });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    MealKey.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {

};

// Find a single Cart with a customerId
exports.findOneWithCart = (req, res) => {
    Menu.findByCart(req.params.cart_id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            return []
            //res.status(404).send({
            //  message: `Not found Customer with id ${req.params.customer_id}.`
            //});
          } else {
            res.status(500).send({
              message: "Error retrieving Customer with id " + req.params.cart_id
            });
          }
        } else res.send(data);
      });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {

};

// Delete a Cart with the specified cartId in the request
exports.delete = (req, res) => {
    console.log('FIRING DELETE....', req.params.id)
      Menu.remove(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              return []
              //res.status(404).send({
              //  message: `Not found Cart with id ${req.params.id}.`
              //});
            } else {
              res.status(500).send({
                message: "Could not delete Cart with id " + req.params.id
              });
            }
          } else res.send({ message: `Cart was deleted successfully!` });
        });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {

};