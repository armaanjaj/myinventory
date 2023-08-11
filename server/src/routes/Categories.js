const express = require("express");
const router = express.Router();
const query = require("../modules/sqlQuery");

router.get("/", (req, res) => {
    query(
        "SELECT * FROM category",
        [],
        (error, result) => {
            if (error !== null) {
                return res.status(error.status).send(error.message);
            } else {
                if (result.length === 0) {
                    return res.status(400).send({
                        success: false,
                        message: "Categories unavailable.",
                    });
                } else {
                    return res.status(200).send({
                        success: true,
                        message: "Categories fetched successfully",
                        data: result,
                    });
                }
            }
        }
    );
});

module.exports = router;
