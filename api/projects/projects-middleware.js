// add middlewares here related to projects
const Projects = require("../projects/projects-model");

function validateProjectId(req, res, next) {
  const id = req.params.id;

  Projects.get(id).then((project) => {
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ message: "project not found" });
    }
  });
}

function validateProject(req, res, next) {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ message: "missing required field" });
  } else {
    next();
  }
}

function validateCompleted(req, res, next) {
  const { completed } = req.body;
  if (!completed) {
    res.status(400).json({ message: "missing completed field" });
  } else {
    next();
  }
}

module.exports = { validateProjectId, validateProject, validateCompleted };
