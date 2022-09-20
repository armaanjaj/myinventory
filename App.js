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
app.use(
    session({
        secret: "index",
        saveUninitialized: true,
        resave: true}
));
const port = process.env.port || 80;
var sess;

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

    pool.getConnection((err, con)=>{
        if (err) throw err;
        con.query(`SELECT * FROM items i join categories c on c.categoryID = i.Category WHERE owner = (SELECT firstName FROM users WHERE email = '${sess.user}')`, function (err, result, fields) {
            // con.release();
            if (err) throw err;
            con.query('SELECT * FROM categories', function (errCat, categoryResult, fieldsCat) {
                if (err) throw err;
                con.release();
                // console.log(categoryResult);
                // console.log(result);
                res.render("inventory", {name: sess.fName, count: (result)?result.length:0, items: result, categories: categoryResult, start_edit: null, edit_category: null, edit_itemName: null, message: null, description: null, edit_price: null, itemName: null, price: null});
                return;
            });
        });
    });
})
app.get("/login", (req, res)=>{
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
app.get("/inventory", (req, res)=>{
    res.send("Inventory Page");
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
    res.status(404).send("Page not found.");
})

// app port listener
app.listen(port, (err)=>{
    if(err) return console.log(err);
    console.log(`Server up running at 'http://localhost:${port}/'`);
})