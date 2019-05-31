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
  

  router.get("/:id", validateActionId, (req,res)=> {
    console.log("inside the get by ID ACTIONS")
    const id = req.params.id;
    console.log(id);
    actionsdb.get(id)
    .then(action => {
        if (action) {
            res.status(200).json({
                action
            });
        } else {
            res.status(201).json({message: "sorry no action"});
        }
        
    })
    .catch(err => {
        res.status(500).json({err, message: "Unable to retrieve action"});
    });
});

router.put("/:id", validateActionId, (req, res) => {
  const id = req.params.id;
  console.log(id);
    actionsdb
    .update(id, req.body)
    .then(response => {
        res.status(200).json(
            response
        )
    })
    .catch(error => {
        res.status(500).json({
            message: "another error"
        });
    });
});

router.delete("/:id", validateActionId, (req, res)=> {
  const id = req.params.id;
  console.log(id);
    actionsdb
    .remove(id)
    .then(response => {
        res.status(200).json({
            message: "action deleted"
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "another error"
        });
    });
});



// CUSTOM MIDDLEWARE

// validate action id


function validateActionId(req, res, next) {
    const id = req.params.id;
    actionsdb
      .get(id)
      .then(action => {
        if (action) {
          req.action = action;
          next();
        } else {
          res.status(400).json({ message: "Invalid Action ID" });
        }
      })
      .catch(error => {
        res.status(500).json( {message: "error in the validation by id function"});
      });
  }



module.exports = router;
