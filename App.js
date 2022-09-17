// module imports
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine', 'ejs'); // uncomment when using ejs
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); // uncomment when using CSS or images in the project
const port = process.env.port || 80;

// route methods
app.get("/", (req, res)=>{ //loginServlet
    // res.send("Hello World!");
    res.render("inventory");
})
app.get("/login", (req, res)=>{
    res.send("Login Page");
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