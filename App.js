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
const port = process.env.port || 443;
let sess = {
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
        // sess = {};
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

            
            if(result.length > 0){
                // console.log(result[0]);
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
    // console.log(sess.user.first_name);

    pool.getConnection((err, con)=>{
        if (err) throw err;
        con.query(`SELECT * FROM item i join category c on c.category_id = i.category WHERE owner = '${sess.user.email}'`, function (err, result, fields) {
            if (err) throw err;
            con.query('SELECT * FROM category', function (errCat, catResult, fieldsCat) {
                if (err) throw err;
                con.release();

                let resultLength = (result)?result.length:0;
                sess.totalItems = resultLength;
                sess.categorylist = catResult;
                sess.itemlist = result;
                let renderObj = {
                    name: sess.user.first_name,
                    count: sess.totalItems,
                    items: sess.itemlist,
                    categories: sess.categorylist,
                    scrollWindow: /^([crud])$/.test(sess.crud)?"true":"false",
                    start_edit: null,

                    edit_category: null,
                    edit_itemName: null,
                    edit_price: null,
                    
                    itemName: null,
                    price: null,
                    message: null,
                    description: null
                };
                res.render("inventory", renderObj);
                return;
            });
        });
    });
})

app.post("/inventory", (req, res)=>{
    sess = req.session;

    if(req.body.action && req.body.action === "delete"){

        let itemid = req.body.deleteItem; // item id of the item to delete
        
        pool.getConnection((err, con)=>{
            if (err) throw err;

            con.query(`DELETE FROM item WHERE item_id = '${itemid}'`, function (err, result) {
                con.release();
                if(err) throw err;

                sess.crud = "d";
                res.redirect("/");
            });
        });
    }
    else if(req.body.action && req.body.action === "edit"){
        
        let itemid = req.body.editItem;  // item id of the item to edit
        
        pool.getConnection((err, con)=>{
            if (err) throw err;

            con.query(`SELECT * FROM item WHERE item_id = '${itemid}'`, function (err, result) {
                con.release();
                if(err) throw err;
                // console.log("Here");
                // console.log(result);
                sess.edititem_id = itemid;  // item id in the session of the item to edit
                
                let renderObj = {
                    name: sess.user.first_name,
                    count: sess.totalItems,
                    items: sess.itemlist,

                    edit_category: result[0].category,
                    edit_itemName: result[0].item_name,
                    edit_price: result[0].price,

                    start_edit: true,
                    scrollWindow: "true",
                    
                    categories: sess.categorylist,
                    itemName: null,
                    price: null,

                    message: null,
                    description: null
                };
                res.render("inventory", renderObj);
            });
        });
    }
    else if(req.body.action && req.body.action === "update"){
        let itemid = sess.edititem_id;  // item id of the item to edit from the session
        let category = req.body.category;
        let itemName = req.body.edit_itemName;
        let itemPrice = req.body.edit_price;

        let renderObj = {
            name: sess.user.first_name,
            count: sess.totalItems,
            items: sess.itemlist,

            edit_category: category,
            edit_itemName: itemName,
            edit_price: itemPrice,

            start_edit: true,
            scrollWindow: "true",
            
            categories: sess.categorylist,
            itemName: null,
            price: null,
        };
        
        if(itemName==="" || itemName === null){
            renderObj = {
                message: "invalidName",
                description: "This field cannot be empty"
            };
            res.render("inventory", renderObj);
            return;
        }
        else if(itemPrice === "" || itemPrice === null){
            renderObj = {
                message: "invalidPrice",
                description: "This field cannot be empty"
            };
            res.render("inventory", renderObj);
            return;
        }   
        
        if(!isNaN(parseFloat(itemName))){
            renderObj = {
                message: "invalidName",
                description: "Enter a valid name"
            };
            res.render("inventory", renderObj);
            return;
        }
        else if(isNaN(parseFloat(itemPrice))){
            renderObj = {
                message: "invalidPrice",
                description: "Enter a valid price"
            };
            res.render("inventory", renderObj);
            return;
        }
        
        pool.getConnection((err, con)=>{
            if (err) throw err;

            con.query(`UPDATE item SET category = '${category}', item_name = '${itemName}', price = '${parseFloat(itemPrice)}' WHERE item_id = '${itemid}'`, function (err, result) {
                con.release();

                if(err) throw err;

                sess.crud = "u";
                res.redirect("/");
                return;
            });
        });
    }
    else{
        let category = req.body.category;
        let itemName = req.body.itemName;
        let itemPrice = req.body.price;

        let renderObj = {
            name: sess.user.first_name,
            count: sess.totalItems,
            items: sess.itemlist,

            edit_category: category,
            edit_itemName: itemName,
            edit_price: itemPrice,

            start_edit: true,
            scrollWindow: "true",
            
            categories: sess.categorylist,
            itemName: null,
            price: null
        };

        if(itemName==="" || itemName === null){
            renderObj = {
                message: "invalidName",
                description: "This field cannot be empty"
            };
            res.render("inventory", renderObj);
            return;
        }
        else if(itemPrice === "" || itemPrice === null){
            renderObj = {
                message: "invalidPrice",
                description: "This field cannot be empty"
            };
            res.render("inventory", renderObj);
            return;
        }   
        
        if(!isNaN(parseFloat(itemName))){
            renderObj = {
                message: "invalidName",
                description: "Enter a valid name"
            };
            res.render("inventory", renderObj);
            return;
        }
        else if(isNaN(parseFloat(itemPrice))){
            let renderObj = {
                message: "invalidPrice",
                description: "Enter a valid price"
            };
            res.render("inventory", renderObj);
            return;
        }

        pool.getConnection((err, con)=>{
            if (err) throw err;
            con.query(`INSERT INTO item (item_id, category, item_name, price, owner) values ('0', '${category}', '${itemName}', '${itemPrice}', '${sess.user.email}')`, function (err, result, fields) {
                con.release();
                
                if(err) throw err;

                sess.crud = "c";
                res.redirect("/");
                return;
            });
        });
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

                        let renderObj = {
                            users: sess.userlist,
                            roles: sess.rolelist,

                            sectionHead: "Add User",
                            formButton: "Save",
                            finalAction: "add",
                            disabled: "false",
                            display: "none",

                            activeCheck: false,
                            showCancel: false,

                            form_email: null,
                            form_password: null,
                            form_firstName: null,
                            form_lastName: null,

                            messageEmail: null,
                            userRole: null,
                            messageRole: null,
                            
                            message: null,
                            description: null,
                        }

                        res.render("manageUsers", renderObj);
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

                    let renderObj = {
                        categories: sess.categorylist,
                        sectionHead: "Add Category",
                        formButton: "Save",
                        finalAction: "add",

                        form_catName: null,
                        messageCatName: null,

                        description: null,
                        showCancel: false
                    }

                    res.render("manageCategories", renderObj);
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
                    let cat_id = req.body.editCategory;

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
                    let cat_id = sess.editcategory_id;
                    let cat_name = req.body.catName;

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
                    let cat_name = req.body.catName;

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
                    let email = req.body.editUser;

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
                    let email = sess.editUseremail;
                    let firstName = req.body.firstName;
                    let lastName = req.body.lastName;
                    let password = req.body.password;
                    let isActive = (req.body.isActive)?"1":"0";
                    let role = req.body.userRole;

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
                    let email = sess.deleteUser;

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
                    let email = sess.editUseremail;
                    let firstName = req.body.firstName;
                    let lastName = req.body.lastName;
                    let password = req.body.password;
                    let isActive = (req.body.isActive)?"1":"0";
                    let role = req.body.userRole;

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

// account route
app.get("/account", (req, res)=>{
    sess = req.session;

    if(!sess.user){
        res.redirect("/login");
        return;
    }

    let fullName = sess.user.first_name + " " + sess.user.last_name;
    res.render("account", {fullName: fullName, email: sess.user.email, firstName: sess.user.first_name, lastName: sess.user.last_name, messageFName: null, messageLName: null, currPassword: null, messageCPass: null, description: null, newPassword: null, messageNPass: null, retypePassword: null, messageRENPass: null, showChangePass: false})
    return;
})

app.post("/account", (req, res)=>{
    res.send("Account Page");
})

app.get("/reset", (req, res)=>{
    res.send("Reset Page");
})

app.get("/reset-password", (req, res)=>{
    res.send("Reset password Page");
})
app.get("/new-account", (req, res)=>{
    res.send("New account Page");
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