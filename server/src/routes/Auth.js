const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const inventoryRoute = require("./Inventory");
const accountRoute = require("./Account");

router.use((req, res, next) => {
    // Retrieve token from header
    const token = req.header("x-auth-token");

    if (!token) return res.status(401).json({ message: "Authorization denied" });

    try {
        const decoded = jwt.verify(token, process.env.SECRETKEY);

        // Attach decoded user info to request object
        req.user = decoded;
        
         // Proceed to the protected route
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
});

// ROUTE SETUP FOR ALL THE ROUTES WHICH REQUIRE AUTHORIZATION
router.use("/inventory", inventoryRoute);
router.use("/account", accountRoute);

module.exports = router;
