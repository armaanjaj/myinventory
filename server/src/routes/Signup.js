const express = require("express");
const router = express.Router();
const query = require("../modules/sqlQuery");
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
    query(
        "INSERT INTO user (email, active, first_name, last_name, password, role) VALUES (?, TRUE, ?, ?, ?, 2)",
        [
            req.body.email,
            req.body.firstName,
            req.body.lastName,
            req.body.password,
        ],
        (error, result) => {
            if (error !== null) {
                return res.status(error.status).send(error.message);
            } else {
                if (result.affectedRows > 0) {

                    // Create a JWT token
                    const token = jwt.sign({
                        email: req.body.email,
                        role: 2,
                        last_name: req.body.lastName,
                    }, process.env.SECRETKEY, {expiresIn: "24h",});

                    return res.status(200).send({
                        success: true,
                        message: "Sign up successful",
                        token
                    });
                }
            }
        }
    );
});

module.exports = router;
