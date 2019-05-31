const express = require("express");
const router = express.Router();
const projectsdb = require("../data/helpers/projectModel");
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


// Create new Action
router.post("/:id/actions", validateProjectId, (req, res) => {
    const newAction = { description: req.body.description, notes: req.body.notes };
    actionsdb
    .insert(newAction)
    .then(response => {
      res.status(201).json(
        response
      );
    })
    .catch(error => {
      res.status(500).json({
        error: error}
      )
    })
  
  });
  




// CUSTOM MIDDLEWARE

// validate project id


function validateProjectId(req, res, next) {
    const id = req.params.id;
    projectsdb
      .get(id)
      .then(project => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(400).json({ message: "Invalid Project ID" });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }



module.exports = router;
