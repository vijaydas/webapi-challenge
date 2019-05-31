const express = require("express");
const router = express.Router();
const projectsdb = require("../data/helpers/projectModel");
const actionsdb = require("../data/helpers/actionModel");
//console.log("inside the action router")
// CRUD 

// Read

router.get("/", (req, res) => {
    console.log("inside the get at root")
    actionsdb.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        res.status(500).json({error: "Unable to retrieve actions"});
    });
});


// Create new Action
router.post("/:id/actions", (req, res) => {

    const newAction = {
        description: req.body.description,
        notes: req.body.notes,
        project_id: req.params.id
     };

    actionsdb
    .insert(newAction)
    .then(action => {
      res.status(201).json(
        action
    );
    })
    .catch(error => {
        console.log(error)
      res.status(500).json(
          error
      )
    })
  
  });
  




// CUSTOM MIDDLEWARE

// validate project id


function validateProjectId(req, res, next) {
    const id = req.body.project_id;
    console.log(id);
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
      .catch(error => {
        res.status(500).json( {message: "error in the validation by id function"});
      });
  }



module.exports = router;
