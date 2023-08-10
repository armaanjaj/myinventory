const express = require("express");
const router = express.Router();
const query = require("../modules/sqlQuery");
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
    query(
        "SELECT * FROM user WHERE email = ?",
        [req.body.email],
        (error, result) => {
            if (error !== null) {
                return res.status(error.status).send(error.message);
            } else {
                if (result.length === 0) {
                    return res.status(400).send({
                        success: false,
                        message: "Email or Password Incorrect",
                    });
                } else {
                    if (Boolean(result[0].active)) {
                        if (result[0].password === req.body.password) {
                            
                            // Create a JWT token
                            const token = jwt.sign({
                                email: result[0].email,
                                role: result[0].role,
                                last_name: result[0].last_name,
                            }, process.env.SECRETKEY, {expiresIn: "2h",});

                            return res.status(200).send({
                                success: true,
                                message: "Request processed successfully",
                                token
                            });
                        } else {
                            return res.status(400).send({
                                success: false,
                                message: "Email or Password Incorrect",
                            });
                        }
                    } else {
                        return res.status(400).send({
                            success: false,
                            message: "User Account Inactive",
                        });
                    }
                }
            }
        }
    );
});

module.exports = router;
