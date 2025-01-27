// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Project = require("./projects-model");

const { validateProjectId, validateProject } = require("./projects-middleware");

router.get("/", (req, res, next) => {
  Project.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.get("/:id", validateProjectId, (req, res) => {
  res.json(req.project);
});

router.post("/", validateProject, (req, res, next) => {
  Project.insert(req.body)
    .then((newProject) => {
      res.status(201).json(newProject);
    })
    .catch(next);
});

router.put("/:id", validateProjectId, validateProject, (req, res, next) => {
  Project.update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch(next);
});

router.delete("/:id", validateProjectId, (req, res, next) => {
  Project.remove(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch(next);
});

router.get("/:id/actions", validateProjectId, (req, res, next) => {
  Project.getProjectActions(req.params.id)
    .then((projectActions) => {
      res.status(201).json(projectActions);
    })
    .catch(next);
});

module.exports = router;
