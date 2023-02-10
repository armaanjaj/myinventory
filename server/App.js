// module imports
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const passport = require("passport");
const session = require("express-session");
const port = process.env.port || 4000;

let sess = {
    secret: "index",
    saveUninitialized: true,
    resave: true,
    cookie: {secure: false, maxAge: 1000 * 60 * 60 * 24},
};
app.use(session(sess));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ROUTE FILES
const loginRoute = require("./src/routes/Login");
const signupRoute = require("./src/routes/Signup");
const inventoryRoute = require("./src/routes/Inventory");
const accountRoute = require("./src/routes/Account");


// ROUTE SETUP
app.use("/store/login", loginRoute);
app.use("/store/signup", signupRoute);
app.use("/store/inventory", inventoryRoute);
app.use("/store/account", accountRoute);

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

    let renderObj = {
        fullName: fullName,
        email: sess.user.email,
        firstName: sess.user.first_name,
        lastName: sess.user.last_name,
        messageFName: null,
        messageLName: null,
        currPassword: null,
        messageCPass: null,
        description: null,
        newPassword: null,
        messageNPass: null,
        retypePassword: null,
        messageRENPass: null,
        showChangePass: false
    }

    res.render("account", renderObj)
    return;
})

app.post("/account", (req, res)=>{
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    pool.getConnection((err, con)=>{
        if (err) throw err;

        con.query(`UPDATE user SET first_name = '${firstName}', last_name = '${lastName}' WHERE email='${email}'`, function (err, result) {
            con.release();
            if(err) throw err;

            res.redirect("/account");
            return;
        });
    });
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