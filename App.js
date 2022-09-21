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
    database: "inventorydb"
});

// route methods
app.get("/login", (req, res)=>{
    res.redirect("/");
    return;
})

// home route or login route
app.get("/", (req, res)=>{
    
    sess = req.session;
    
    if(req.query.action && req.query.action === 'logout'){
        sess = {};
        req.session.destroy();
        res.redirect("/login");
        return;
    }

    if(sess.user){

        if(sess.user.role === 2){
            res.redirect("/inventory");
            return;
        }
        else if(sess.user.role === 1 || sess.user.role === 3){
            res.redirect("/admin");
            return;
        }
    }
    res.render("login", {message: "", email:"", password:"", description:""});
})

app.post("/", (req, res)=>{
    sess = req.session;

    pool.getConnection((err, con)=>{
        if (err) throw err;
        con.query(`SELECT * FROM user WHERE email = '${req.body.email}'`, function (err, result, fields) {

            con.release();
            if (err) {res.render("login", {message: "backendError", email:`${req.body.email}`, password:`${req.body.password}`, description: "Something went wrong! Please try agian."});};

            if(result){
                if(Boolean(result[0].active)){
                    if(result[0].password === req.body.password){
                        // update user object in the session
                        sess.user = result[0];

                        if(result[0].role === 2){
                            res.redirect("/inventory");
                            return;
                        }
                        else if(result[0].role === 1 || result[0].role === 3){
                            res.redirect("/admin");
                            return;
                        }
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

// inventory route
app.get("/inventory", (req, res)=>{
    sess = req.session;

    if(!sess.user){
        res.redirect("/login");
        return;
    }

    pool.getConnection((err, con)=>{
        if (err) throw err;
        con.query(`SELECT * FROM item i join category c on c.category_id = i.category WHERE owner = '${sess.user.email}'`, function (err, result, fields) {
            if (err) throw err;
            con.query('SELECT * FROM category', function (errCat, catResult, fieldsCat) {
                if (err) throw err;
                con.release();

                var resultLength = (result)?result.length:0;
                sess.totalItems = resultLength;
                sess.categorylist = catResult;
                sess.itemlist = result;
                res.render("inventory", {name: sess.user.first_name, count: sess.totalItems, items: sess.itemlist, categories: sess.categorylist, start_edit: null, edit_category: null, edit_itemName: null, message: null, description: null, edit_price: null, itemName: null, price: null});
                return;
            });
        });
    });
})

app.post("/inventory", (req, res)=>{
    sess = req.session;

    if(req.body.action && req.body.action === "delete"){

        var itemid = req.body.deleteItem; // item id of the item to delete
        
        pool.getConnection((err, con)=>{
            if (err) throw err;

            con.query(`DELETE FROM item WHERE item_id = '${itemid}'`, function (err, result) {
                con.release();
                if(err) throw err;
                res.redirect("/");
            });
        });
    }
    else if(req.body.action && req.body.action === "edit"){
        
        var itemid = req.body.editItem;  // item id of the item to edit
        
        pool.getConnection((err, con)=>{
            if (err) throw err;

            con.query(`SELECT * FROM item WHERE item_id = '${itemid}'`, function (err, result) {
                con.release();
                if(err) throw err;
                // console.log("Here");
                // console.log(result);
                sess.edititem_id = itemid;  // item id in the session of the item to edit
                res.render("inventory", {name: sess.user.first_name, count: sess.totalItems, items: sess.itemlist, categories: sess.categorylist, start_edit: true, edit_category: result[0].category_id, edit_itemName: result[0].item_name, message: null, description: null, edit_price: result[0].price, itemName: null, price: null});
            });
        });
    }
    else if(req.body.action && req.body.action === "update"){
        var itemid = sess.edititem_id;  // item id of the item to edit from the session
        var category = req.body.category;
        var itemName = req.body.edit_itemName;
        var itemPrice = Number(req.body.edit_price);
        
        if(category==="" || category === null || itemName==="" || itemName === null || isNaN(itemPrice)){
            res.render("inventory", {name: sess.user.First_name, count: sess.totalItems, items: sess.itemlist, categories: sess.categorylist, start_edit: null, edit_category: null, edit_itemName: null, message: null, description: null, edit_price: null, itemName: null, price: null});
            return;
        }
        else{
            pool.getConnection((err, con)=>{
                if (err) throw err;

                con.query(`UPDATE item SET category = '${category}', item_name = '${itemName}', price = '${itemPrice}' WHERE item_id = '${itemid}'`, function (err, result) {
                    con.release();

                    if(err) throw err;

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
            res.render("inventory", {name: sess.user.First_name, count: sess.totalItems, items: sess.itemlist, categories: sess.categorylist, start_edit: null, edit_category: null, edit_itemName: null, message: null, description: null, edit_price: null, itemName: null, price: null});
            return;
        }
        else{
            pool.getConnection((err, con)=>{
                if (err) throw err;
                con.query(`INSERT INTO item (item_id, category, item_name, price, owner) values ('0', '${category}', '${itemName}', '${itemPrice}', '${sess.user.email}')`, function (err, result, fields) {
                    con.release();
                    
                    if(err) throw err;

                    res.redirect("/");
                    return;
                });
            });
        }
    }
})

// admin route
app.get("/admin", (req, res)=>{
    sess = req.session;

    if(!sess.user){
        res.redirect("/login");
        return;
    }
    else if(sess.user.role === 2){
        res.redirect("/inventory");
        return;
    }

    if(req.query.action){
        if(req.query.action === "users"){

            pool.getConnection((err, con)=>{
                if (err) throw err;
                con.query(`SELECT * FROM user`, function (err, userlist, fields) {
                    if (err) throw err;

                    con.query('SELECT * FROM role', function (errrole, rolelist, rolefields) {
                        if (err) throw errrole;

                        con.release();
                        
                        sess.userlist = userlist;
                        sess.rolelist = rolelist;

                        res.render("manageUsers", {users: sess.userlist, roles: sess.rolelist, sectionHead: "Add User", activeCheck: false, formButton: "Save", finalAction: "add", disabled: "false", display: "none", message: null, description: null, form_email: null, messageEmail: null, showCancel: false, form_password: null, form_firstName: null, form_lastName: null, userRole: null, messageRole: null});
                        return;
                    });
                });
            });
        }
        else if(req.query.action === "categories"){
            pool.getConnection((err, con)=>{
                if (err) throw err;
                con.query(`SELECT * FROM category`, function (err, categorylist, fields) {
                    if (err) throw err;

                    con.release();
                    
                    sess.categorylist = categorylist;

                    res.render("manageCategories", {categories: sess.categorylist, sectionHead: "Add Category", formButton: "Save", form_catName: null, messageCatName: null, finalAction: "add", description: null, showCancel: false});
                    return;
                });
            });
        }
    }
    else{
        res.render("admin", {adminName: sess.user.First_name});
    }
});

app.post("/admin", (req, res)=>{

    if(req.body.manage === "category"){
        if(req.body.resetAction != "cancel"){

            switch(req.body.action){
                case "edit":{
                    var cat_id = req.body.editCategory;

                    pool.getConnection((err, con)=>{
                        if (err) throw err;
            
                        con.query(`SELECT * FROM category WHERE category_id = '${cat_id}'`, function (err, result) {
                            con.release();
                            if(err) throw err;

                            sess.editcategory_id = cat_id;
                            res.render("manageCategories", {categories: sess.categorylist, sectionHead: "Edit Category", formButton: "Update", form_catName: result[0].category_name, messageCatName: null, finalAction: "update", description: null, showCancel: true});
                            return;
                        });
                    });
                    break;
                }
                case "update":{
                    var cat_id = sess.editcategory_id;
                    var cat_name = req.body.catName;

                    pool.getConnection((err, con)=>{
                        if (err) throw err;
            
                        con.query(`UPDATE category set category_name = '${cat_name}' WHERE category_id = '${cat_id}'`, function (err, result) {
                            con.release();
                            if(err) throw err;

                            res.redirect("/admin?action=categories");
                            return;
                        });
                    });
                    break;
                }
                case "add":{
                    var cat_name = req.body.catName;

                    pool.getConnection((err, con)=>{
                        if (err) throw err;
            
                        con.query(`INSERT INTO category VALUES ('0', '${cat_name}')`, function (err, result) {
                            con.release();
                            if(err) throw err;

                            res.redirect("/admin?action=categories");
                            return;
                        });
                    });
                    break;
                }
            }
        }
        else{
            res.redirect("/admin?action=categories");
            return;
        }
    }
    else if(req.body.manage && req.body.manage === "user"){
        if(req.body.resetAction != "cancel"){

            switch(req.body.action){
                case "edit":{
                    var email = req.body.editUser;

                    pool.getConnection((err, con)=>{
                        if (err) throw err;
            
                        con.query(`SELECT * FROM user WHERE email = '${email}'`, function (err, result) {
                            con.release();
                            if(err) throw err;

                            sess.editUseremail = email;
                            
                            res.render("manageUsers", {users: sess.userlist, roles: sess.rolelist, sectionHead: "Add User", activeCheck: (result[0].active === 1), formButton: "Edit", finalAction: "update", disabled: "true", display: "inline-block", message: null, description: null, form_email: result[0].email, showCancel: true, form_password: result[0].password, form_firstName: result[0].first_name, form_lastName: result[0].last_name, userRole: result[0].role, messageRole: null, messageEmail: null});
                            return;
                        });
                    });
                    break;
                }
                case "update":{
                    var email = sess.editUseremail;
                    var firstName = req.body.firstName;
                    var lastName = req.body.lastName;
                    var password = req.body.password;
                    var isActive = (req.body.isActive)?"1":"0";
                    var role = req.body.userRole;

                    pool.getConnection((err, con)=>{
                        if (err) throw err;
            
                        con.query(`UPDATE user SET first_name = '${firstName}', last_name = '${lastName}', password = '${password}', active = '${isActive}', role = '${role}' WHERE email = '${email}'`, function (err, result) {
                            con.release();
                            if(err) throw err;

                            res.redirect("/admin?action=users");
                            return;
                        });
                    });
                    break;
                }
                case "delete":{
                    var email = sess.deleteUser;

                    pool.getConnection((err, con)=>{
                        if (err) throw err;
            
                        con.query(`DELETE FROM user WHERE email = '${email}'`, function (err, result) {
                            con.release();
                            if(err) throw err;

                            res.redirect("/admin?action=users");
                            return;
                        });
                    });   
                    break;                 
                }
                case "add":{
                    var email = sess.editUseremail;
                    var firstName = req.body.firstName;
                    var lastName = req.body.lastName;
                    var password = req.body.password;
                    var isActive = (req.body.isActive)?"1":"0";
                    var role = req.body.userRole;

                    pool.getConnection((err, con)=>{
                        if (err) throw err;
            
                        con.query(`INSERT INTO user (email, first_name, last_name, password, active, role, reset_password_uuid, register_account_uuid, authentication_uuid) VALUES ('${email}', '${firstName}', '${lastName}', '${password}', '${isActive}', '${role}', 'null', 'null', 'null')`, function (err, result) {
                            con.release();
                            if(err) throw err;

                            res.redirect("/admin?action=users");
                            return;
                        });
                    });
                    break;
                }
            }
        }
        else{
            res.redirect("/admin?action=users");
            return;
        }
    }

});

app.get("/reset", (req, res)=>{
    res.send("Reset Page");
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