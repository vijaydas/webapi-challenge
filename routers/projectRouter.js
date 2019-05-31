const express = require("express");
const router = express.Router();

const projectsdb = require("../data/helpers/projectModel");

// CRUD
// Read

router.get("/", (req,res)=> {
    projectsdb.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        res.status(500).json({error: "Unable to retrieve projects"});
    });
});



module.exports = router;