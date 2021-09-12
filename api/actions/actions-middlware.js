// add middlewares here related to actions

const Action = require("./actions-model");

function validateActionId(req, res, next) {
  const id = req.params.id;

  Action.get(id).then((action) => {
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(404).json({ message: "action not found" });
    }
  });
}

function validateAction(req, res, next) {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res.status(400).json({ message: "missing required field" });
  } else {
    next();
  }
}

module.exports = { validateActionId, validateAction };
