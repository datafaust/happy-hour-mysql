const sql = require("./db.js");


// Constructor
const MealKey =  function(mealKey)  {
  this.cart_id =  menu.cart_id,
  this.menu_name = menu.menu_name,
  this.time_created = menu.time_created
};

MealKey.create = (newMenu, result) => {
  sql.query("INSERT INTO pitapaldb.menu SET ?", newMenu, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Menu: ", { id: res.insertId, ...newMenu });
    result(null, { id: res.insertId, ...newMenu });
  });
};

MealKey.findById = (customerId, result) => {
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

MealKey.findByCart = (cartId, result) => {
  sql.query("SELECT * FROM pitapaldb.menu where cart_id = '"+cartId+"';", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Menu: ", res);
      result(null, res);
      return res;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

MealKey.getAll = result => {
  sql.query("SELECT * FROM pitapaldb.meal_key", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

MealKey.updateById = (id, customer, result) => {
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

MealKey.remove = (id, result) => {
  sql.query("DELETE FROM pitapaldb.menu WHERE id = ?", id, (err, res) => {
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

MealKey.removeAll = result => {
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

module.exports = MealKey;