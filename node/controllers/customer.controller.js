const Customer = require("../models/customer.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const customer = new Customer({
        fbid: req.query.fbid,
        customer_name: req.query.customer_name,
        city_id: req.query.city_id,
        phone: req.query.phone,
        email: req.query.email,
        time_joined: req.query.time_joined,
        coins: req.query.coins
    });

    console.log(customer)


    // Save Customer in the database
     Customer.create(customer, (err, data) => {
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
    Customer.getAll((err, data) => {
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

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {

};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {

};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {

};