const express = require("express");
const router = express.Router();
const query = require("../modules/sqlQuery");

router.get("/", (req, res) => {
    query(
        "SELECT * FROM item i join category c on c.category_id = i.category WHERE owner = ?",
        [req.body.email],
        (error, result) => {
            if (error !== null) {
                return res.status(error.status).send(error.message);
            } else {
                if (result.length === 0) {
                    return res.status(400).send({
                        success: false,
                        message: "No items found in your account",
                    });
                } else {
                    return res.status(200).send(result);
                }
            }
        }
    );
});

module.exports = router;
