// module imports
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const session = require('express-session');
app.set('view engine', 'ejs'); // uncomment when using ejs
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); // uncomment when using CSS or images in the project
var mysql = require('mysql');
const port = process.env.port || 80;
var sess = {
    secret: "index",
        saveUninitialized: true,
        resave: true
};
app.use(session(sess));

var pool = mysql.createPool({
    connectionLimit:100,
    host: "localhost",
    port: 3307,
    user: "root",
    password: "password",
    database: "homeinventorydb"
});
// var con = mysql.createConnection({
//     host: "localhost",
//     port: 3307,
//     user: "root",
//     password: "password",
//     database: "homeinventorydb"
// });

// route methods
app.get("/", (req, res)=>{
    sess = req.session;

    if(!sess.user){
        res.redirect("/login");
        return;
    }

    pool.getConnection((err, con)=>{
        if (err) throw err;
        con.query(`SELECT * FROM items i join categories c on c.categoryID = i.Category WHERE owner = (SELECT firstName FROM users WHERE email = '${sess.user}')`, function (err, result, fields) {
            if (err) throw err;
            con.query('SELECT * FROM categories', function (errCat, categoryResult, fieldsCat) {
                if (err) throw err;
                con.release();
                var resultLength = (result)?result.length:0;
                sess.totalResults = resultLength;
                sess.categories = categoryResult;
                sess.results = result;
                res.render("inventory", {name: sess.fName, count: resultLength, items: result, categories: categoryResult, start_edit: null, edit_category: null, edit_itemName: null, message: null, description: null, edit_price: null, itemName: null, price: null});
                return;
            });
        });
    });
})
app.post("/", (req, res)=>{
    sess = req.session;

    if(req.body.action && req.body.action === "delete"){
        var itemid = req.body.deleteItem;
        pool.getConnection((err, con)=>{
            if (err) throw err;
            con.query(`DELETE FROM items WHERE ItemID = '${itemid}'`, function (err, result) {
                con.release();
                if(err) throw err;
                res.redirect("/");
            });
        });
    }
    else if(req.body.action && req.body.action === "edit"){
        var itemid = req.body.editItem;
        pool.getConnection((err, con)=>{
            if (err) throw err;
            con.query(`SELECT * FROM items WHERE itemID = '${itemid}'`, function (err, result) {
                con.release();
                if(err) throw err;
                sess.edititem_id = itemid;
                res.render("inventory", {name: sess.fName, count: sess.totalResults, items: sess.results, categories: sess.categories, start_edit: true, edit_category: result[0].Category, edit_itemName: result[0].ItemName, message: null, description: null, edit_price: result[0].Price, itemName: null, price: null});
            });
        });
    }
    else if(req.body.action && req.body.action === "update"){
        var itemid = sess.edititem_id;
        var category = req.body.category;
        var itemName = req.body.edit_itemName;
        var itemPrice = Number(req.body.edit_price);
        console.log(category)
        console.log(itemName)
        console.log(itemPrice)
        
        if(category==="" || category === null || itemName==="" || itemName === null || isNaN(itemPrice)){
            res.render("inventory", {name: sess.fName, count: sess.totalResults, items: sess.results, categories: sess.categories, start_edit: null, edit_category: null, edit_itemName: null, message: null, description: null, edit_price: null, itemName: null, price: null});
            return;
        }
        else{
            pool.getConnection((err, con)=>{
                if (err) throw err;
                con.query(`UPDATE items SET category = '${category}', itemName = '${itemName}', price = '${itemPrice}' WHERE itemID = '${itemid}'`, function (err, result) {
                    con.release();
                    if(err) throw err;
                    console.log("Done"); 
                    res.redirect("/");
                    return;
                });
            });
        }
    }
    else{
        var category = req.body.category;
        var itemName = req.body.itemName;
        var itemPrice = Number(req.body.price);

        if(category==="" || category === null || itemName==="" || itemName === null || isNaN(itemPrice)){
            res.render("inventory", {name: sess.fName, count: sess.totalResults, items: sess.results, categories: sess.categories, start_edit: null, edit_category: null, edit_itemName: null, message: null, description: null, edit_price: null, itemName: null, price: null});
            return;
        }
        else{
            pool.getConnection((err, con)=>{
                if (err) throw err;
                con.query(`INSERT INTO items (itemID, category, itemName, price, owner) values ('0', '${category}', '${itemName}', '${itemPrice}', '${sess.fName}')`, function (err, result, fields) {
                    con.release();
                    if(err) throw err;
                    // console.log("Done");
                    res.redirect("/");
                    return;
                });
            });
        }
    }
})
app.get("/login", (req, res)=>{
    if(req.query.action && req.query.action === 'logout'){
        sess = {};
        req.session.destroy();
        res.redirect("/login");
        return;
    }
    sess = req.session;
    if(sess.user){
        res.redirect("/");
        return;
    }
    res.render("login", {message: "", email:"", password:"", description:""});
})
app.post("/login", (req, res)=>{
    sess = req.session;
    sess.user = req.body.email;
    pool.getConnection((err, con)=>{
        if (err) throw err;
        con.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, function (err, result, fields) {
            // con.end();
            con.release();
            if (err) {res.render("login", {message: "backendError", email:`${req.body.email}`, password:`${req.body.password}`, description: "Something went wrong! Please try agian."});};

            if(result){
                if(result[0].Active){
                    if(result[0].Password === req.body.password){
                        sess.fName = result[0].FirstName;
                        // console.log(sess);
                        if(Boolean(result[0].IsAdmin.readInt8())){
                            res.redirect("/admin");
                            return;
                        }
                        res.redirect("/");
                        return;
                    }
                    else{
                        res.render("login", {message: "invalidPassword", email:`${req.body.email}`, password:`${req.body.password}`, description: "Invalid password."});
                    }
                }
                else{
                    res.render("login", {message: "unauthorized", email:`${req.body.email}`, password:`${req.body.password}`, description: "Account not activated."});
                }
            }
            else{
                res.render("login", {message: "invalidEmail", email:`${req.body.email}`, password:`${req.body.password}`, description: "No user for this email"});
            }
        });
    });
})
app.get("/reset", (req, res)=>{
    res.send("Reset Page");
})
app.get("/admin", (req, res)=>{
    res.send("Admin Page");
})
app.get("/reset-password", (req, res)=>{
    res.send("Reset password Page");
})
app.get("/new-account", (req, res)=>{
    res.send("New account Page");
})
app.get("/account", (req, res)=>{
    res.send("Account Page");
})

// handling status errors
app.use((req, res)=>{
    res.status(404).sendFile(__dirname+"/views/html-files/pageNotFound.html");
})

// app port listener
app.listen(port, (err)=>{
    if(err) return console.log(err);
    console.log(`Server up running at 'http://localhost:${port}/'`);
})