const sql = require("./db.js");


// Constructor
const Cart =  function(cart)  {
  this.customer_id= cart.customer_id,
  this.cart_name= cart.cart_name,
  this.lat= cart.lat,
  this.lon= cart.lon,
  this.cart_address= cart.cart_address,
  this.active= cart.active,
  this.city_id= cart.city_id
};

Cart.create = (newCart, result) => {
  sql.query("INSERT INTO pitapaldb.cart SET ?", newCart, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created cart: ", { id: res.insertId, ...newCart });
    result(null, { id: res.insertId, ...newCart });
  });
};

Cart.findById = (customerId, result) => {
  sql.query(`SELECT * FROM pitapaldb.customer WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Cart.findByCustomerId = (customerId, result) => {
  sql.query("SELECT * FROM pitapaldb.cart where customer_id = '"+customerId+"';", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found cart: ", res);
      result(null, res);
      return res;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Cart.getAll = result => {
  sql.query("SELECT * FROM pitapaldb.cart", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Cart.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE pitapaldb.customer SET email = ?, name = ?, active = ? WHERE id = ?",
    [customer.email, customer.name, customer.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Cart.remove = (id, result) => {
  sql.query("DELETE FROM pitapaldb.cart WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

Cart.removeAll = result => {
  sql.query("DELETE FROM pitapaldb.customer", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = Cart;