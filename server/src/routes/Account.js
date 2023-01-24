const express = require("express");
const router = express.Router();
const query = require("../modules/sqlQuery");

router.get("/", (req, res)=>{

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
                        return res.status(200).send({
                            success: true,
                            message: "Request processed successfully",
                            data: {
                                email: result[0].email,
                                active: Boolean(result[0].active) ? true : false,
                                first_name: result[0].first_name,
                                last_name: result[0].last_name,
                                role: result[0].role,
                            },
                        });
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

})

module.exports = router;