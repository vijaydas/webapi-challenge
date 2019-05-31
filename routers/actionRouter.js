const express = require("express");
const router = express.Router();

const actionsdb = require("../data/helpers/actionModel");

// CRUD 

// Read

router.get("/", (req, res) => {
    actionsdb.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        res.status(500).json({error: "Unable to retrieve actions"});
    });
});






module.exports = router;