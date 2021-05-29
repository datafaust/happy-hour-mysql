const cors = require('cors');
const express = require('express');
const mysql = require('mysql');

const app = express();
// call cors
app.use(cors()); 

const port = 3008;
//host = mysql

//connection for database
const pool = mysql.createPool({
    host : "mysql",  
    //host: '192.168.1.183',
    user : "root",
    password : "password",
    database : "pitapaldb",
    insecureAuth : true,
    multipleStatements: true
  });

//test generic serve access
app.get('/', (req, res) => res.send('wassup!'))

//PULL ALL CARTS
app.get('/carts',  function(req,res){
    var sql = "SELECT * FROM pitapaldb.carts;";
    pool.query(sql, function(err, results) {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});

//PULL ALL CUSTOMERS
app.get('/customer',  function(req,res){
    var sql = "SELECT * FROM pitapaldb.customer;";
    pool.query(sql, function(err, results) {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});

//PULL ALL MENU KEY ITEMS
app.get('/mealKey',  function(req,res){
    var sql = "SELECT * FROM pitapaldb.meal_key;";
    pool.query(sql, function(err, results) {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});


//PULL A SPECIFIC CART
app.get('/cart/:customer_id',  function(req,res){
    var customer_id = req.params.customer_id;

    var sql = "SELECT * FROM pitapaldb.carts where customer_id = '"+customer_id+"';";
 pool.query(sql, function(err, results) {
     if(err) {
         console.log(err)
     } else {
         console.log(results)
        return res.json({
            data: results
        })
       
     }
 });
});

app.delete('/deleteAllMenu',  cors(), (req, res) => {
    // now the createStudent is an object you can use in your database insert logic.
    var sql = "DELETE FROM pitapaldb.menu;";
    pool.query(sql, function (err, result) {
    if (err) throw err;
  });
});



//DELETE A SPECIFIC CART
app.delete('/deleteCart',  cors(), (req, res) => {
    var my_data = {id: req.query.id}
    // now the createStudent is an object you can use in your database insert logic.
    var sql = "DELETE FROM pitapaldb.carts WHERE id = '"+my_data.id+"'";
    pool.query(sql, function (err, result) {
    if (err) throw err;
  });
});


//CREATE A MENU
app.post('/addMenu',  cors(), (req, res) => {
    //current_time = moment().utcOffset('-0400').format("YYYY-MM-DD HH:mm:ss").substr(0,18)+'0';
    var my_data = {
        cart_id: req.query.cart_id,
        menu_name: req.query.menu_name,
        time_created: req.query.time_created,
       }
       // now the createStudent is an object you can use in your database insert logic.
       pool.query('INSERT INTO pitapaldb.menu SET ?', my_data, function (err, results) {
        if(err) {
            console.log(err)
            return res.send(err)
        } else {
            console.log(results)
            return res.json({
                data: results
            })
        }
    });
});

//DELETE A SPECIFIC MENU
app.delete('/deleteMenu',  cors(), (req, res) => {
    var my_data = {id: req.query.id}
    // now the createStudent is an object you can use in your database insert logic.
    var sql = "DELETE FROM pitapaldb.menu WHERE id = '"+my_data.id+"'";
    pool.query(sql, function (err, result) {
    if (err) throw err;
  });
});

//GET A MENU FOR A SPECIFIC CART
app.get('/menu/:cart_id',  function(req,res){
    var cart_id = req.params.cart_id;

    var sql = "SELECT * FROM pitapaldb.menu where cart_id = '"+cart_id+"';";
 pool.query(sql, function(err, results) {
     if(err) {
         console.log(err)
     } else {
         console.log(results)
        return res.json({
            data: results
        })
       
     }
 });
});






//PULL ALL MENU ITEMS FROM STAGING
app.get('/menus',  function(req,res){
    var sql = "SELECT * FROM pitapaldb.menu_item;";
    pool.query(sql, function(err, results) {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});


//POST TO DATABASE
app.post('/addCustomer',  cors(), (req, res) => {
    //current_time = moment().utcOffset('-0400').format("YYYY-MM-DD HH:mm:ss").substr(0,18)+'0';
    var my_data = {
        //id: req.query.id,
        fbid: req.query.fbid,
        customer_name: req.query.customer_name,
        city_id:req.query.city_id,
        phone:req.query.phone,
        email:req.query.email,
        time_joined:req.query.time_joined//,
        //cart_name: req.query.cart_name,
        //cart_address: req.query.cart_address,
        //category: req.query.category
       }
       // now the createStudent is an object you can use in your database insert logic.
       pool.query('INSERT INTO pitapaldb.customer SET ?', my_data, function (err, results) {
        if(err) {
            console.log(err)
            return res.send(err)
            
        } else {
            console.log(results)
            return res.json({
                data: results
            })
        }
    });
});

//RETRIEVE CUSTOMER DATABASE UNIQUE ID
app.get('customer/fbid:',  function(req,res){
    var fbid = req.params.fbid;

    var sql = "SELECT * FROM pitapaldb.customer where fbid = '"+fbid+"';";
 pool.query(sql, function(err, results) {
     if(err) {
         console.log(err)
     } else {
         console.log(results)
        return res.json({
            data: results
        })
       
     }
 });
});


//POST A CART
app.post('/addCart',  cors(), (req, res) => {
    //current_time = moment().utcOffset('-0400').format("YYYY-MM-DD HH:mm:ss").substr(0,18)+'0';
      var values = {
        //id: req.query.id,
        customer_id: req.query.customer_id,
        cart_name: req.query.cart_name,
        lat: req.query.lat,
        lon: req.query.lon,
        cart_address: req.query.cart_address,
        active: req.query.active,
        city_id: req.query.city_id
       }

       // now the createStudent is an object you can use in your database insert logic.
       pool.query('INSERT INTO pitapaldb.carts SET ?', values, function (err, results) {
        if(err) {
            console.log(err)
            return res.send(err)
            
        } else {
            console.log(results)
            return res.json({
                data: results
            })
        }
    });
});


//POST TO PENDING MENU
app.post('/addMenuItem',  cors(), (req, res) => {
    //current_time = moment().utcOffset('-0400').format("YYYY-MM-DD HH:mm:ss").substr(0,18)+'0';
      var values = {
        id: req.query.id,
        cart_id: req.query.cart_id,
        item_name: req.query.item_name,
        category_id: req.query.category_id,
        item_description: req.query.item_description,
        price: req.query.price,
        active: req.query.active,
        condiments: req.query.condiments
       }

       // now the createStudent is an object you can use in your database insert logic.
       pool.query('INSERT INTO pitapaldb.menu_item SET ?', values, function (err, results) {
        if(err) {
            console.log(err)
            return res.send(err)
            
        } else {
            console.log(results)
            return res.json({
                data: results
            })
        }
    });
});

//POST TO PENDING MENU - CONDIMENTS ONLY
app.put('/addCondiments', cors(), (req, res) => {
    var my_data = {
        condiments: req.query.condiments
       }
    var sql = "update geohut_sport.groups set members = json_array_append(members, '$','"+my_data.user_id+"') where group_id = '"+my_data.group_id+"'";

       pool.query(sql, function (err, result) {
        if (err) throw err;
        res.end(JSON.stringify(result));
      });
 });




//POST TO PENDING MENU - W NESTED ARRAY
app.post('/addMenuItemCond',  cors(), (req, res) => {
      
      //extract all values beside nested array
      var values = {
        id: req.query.id,
        cart_id: req.query.cart_id,
        item_name: req.query.item_name,
        category_id: req.query.category_id,
        cart_description: req.query.cart_description,
        price: req.query.price,
        active: req.query.active
       }

       var arrays = {
        condiments: req.query.condiments
       }

       var sqlInsert = 'INSERT INTO pitapaldb.menu_item SET ?';
       var sqlArrayInsert = "INSERT INTO pitapaldb.menu_item (condiments) values('"+JSON.stringify(arrays.condiments)+"')"
    
       // now the createStudent is an object you can use in your database insert logic.
       pool.query(sqlInsert, sqlArrayInsert, [values,arrays], function (err, results) {
        if(err) {
            console.log(err)
            console.log('array!',arrays)
            return res.send(err)
            
        } else {
            console.log(results)
            return res.json({
                data: results
            })
        }
    });
});







//set server to listen 
app.listen(port,()=>console.log(`Express Server is Running on port ${port}`));

