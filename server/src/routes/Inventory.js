const express = require("express");
const router = express.Router();
const query = require("../modules/sqlQuery");

router
    .get("/", (req, res) => {
        if (req.query.email === "" || req.query.email === undefined) {
            return res.status(500).send({
                success: false,
                message: "Not enough data to process the request",
            });
        }

        query(
            "SELECT * FROM item i join category c on c.category_id = i.category WHERE owner = ?",
            [req.query.email],
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
    })

    .get("/:itemId", (req, res) => {
        if (req.query.email === "" || req.query.email === undefined) {
            return res.status(500).send({
                success: false,
                message: "Not enough data to process the request",
            });
        }

        query(
            "SELECT * FROM item i join category c on c.category_id = i.category WHERE owner = ? AND item_id = ?",
            [req.query.email, req.params.itemId],
            (error, result) => {
                if (error !== null) {
                    return res.status(error.status).send(error.message);
                } else {
                    if (result.length === 0) {
                        return res.status(400).send({
                            success: false,
                            message: "Item not found in your account",
                        });
                    } else {
                        return res.status(200).send(result);
                    }
                }
            }
        );
    })

    .post("/", (req, res) => {
        if (
            typeof req.body.category !== "number" ||
            req.body.itemName === "" ||
            req.body.price === "" ||
            req.body.email === "" ||
            req.body.category === undefined ||
            req.body.itemName === undefined ||
            req.body.price === undefined ||
            req.body.email === undefined
        ) {
            return res.status(500).send({
                success: false,
                message: "Not enough data to process the request",
            });
        }

        query(
            "INSERT INTO item (category, item_name, price, owner) values (?, ?, ?, ?)",
            [
                req.body.category,
                req.body.itemName,
                req.body.price,
                req.body.email,
            ],
            (error, result) => {
                if (error !== null) {
                    return res.status(error.status).send(error.message);
                } else {
                    if (result.insertId && result.affectedRows > 0) {
                        return res.status(200).send({
                            success: true,
                            message: "Item added successfully",
                            result,
                        });
                    }
                }
            }
        );
    })

    .patch("/", (req, res) => {})

    .delete("/:itemId", (req, res) => {
        if (!Number(req.params.itemId)) {
            return res.status(500).send({
                success: false,
                message: "Not enough data to process the request",
            });
        }

        query(
            "DELETE FROM item WHERE item_id = ?",
            [req.params.itemId],
            (error, result) => {
                if (error !== null) {
                    return res.status(error.status).send(error.message);
                } else {
                    if (result.affectedRows > 0) {
                        return res.status(200).send({
                            success: true,
                            message: "Item removed successfully",
                            result,
                        });
                    } else {
                        return res.status(200).send({
                            success: false,
                            message:
                                "Request for this specific item couldn't be processed",
                            result,
                        });
                    }
                }
            }
        );
    })

    .put("/:itemId", (req, res) => {
        if (
            typeof req.body.category !== "number" ||
            req.body.itemName === "" ||
            req.body.price === "" ||
            req.body.email === "" ||
            req.body.category === undefined ||
            req.body.itemName === undefined ||
            req.body.price === undefined ||
            req.body.email === undefined ||
            !Number(req.params.itemId)
        ) {
            return res.status(500).send({
                success: false,
                message: "Not enough data to process the request",
            });
        }

        query(
            "UPDATE item SET category = ?, item_name = ?, price = ? WHERE owner = ? AND item_id = ?",
            [
                req.body.category,
                req.body.itemName,
                req.body.price,
                req.body.email,
                req.params.itemId,
            ],
            (error, result) => {
                if (error !== null) {
                    return res.status(error.status).send(error.message);
                } else {
                    if (result.affectedRows > 0) {
                        return res.status(200).send({
                            success: true,
                            message: "Item edited successfully",
                            result,
                        });
                    }
                }
            }
        );
    });

module.exports = router;
