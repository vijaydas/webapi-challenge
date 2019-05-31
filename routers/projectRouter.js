const express = require("express");
const router = express.Router();
const actionsdb = require("../data/helpers/actionModel");
const projectsdb = require("../data/helpers/projectModel");

// CRUD

router.get("/", (req,res)=> {
    console.log("inside the get at root PROJECTS")
    projectsdb.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        res.status(500).json({err, message: "Unable to retrieve projects"});
    });
});

router.get("/:id", validateProjectId, (req,res)=> {
    console.log("inside the get by ID PROJECTS")
    const id = req.params.id;
    console.log(id);
    projectsdb.get(id)
    .then(project => {
        if (project) {
            res.status(200).json({
                project
            });
        } else {
            res.status(201).json({message: "sorry no project"});
        }
        
    })
    .catch(err => {
        res.status(500).json({err, message: "Unable to retrieve project"});
    });
});



// Create

router.post("/", (req, res) => {
    projectsdb.insert(req.body)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(error => {
        res.status(500).json({ error, message: "Error adding the project!" });
      });
  });


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
      .catch(error => {
        res.status(500).json( {message: "error in the validation by id function"});
      });
  }



module.exports = router;