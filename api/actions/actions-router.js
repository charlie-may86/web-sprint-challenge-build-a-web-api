// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Action = require("./actions-model");

const { validateActionId, validateAction } = require("./actions-middlware");

router.get("/", (req, res, next) => {
  Action.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.get("/:id", validateActionId, (req, res) => {
  res.json(req.action);
});

router.post("/", validateAction, (req, res, next) => {
  Action.insert(req.body)
    .then((newAction) => {
      res.status(201).json(newAction);
    })
    .catch(next);
});

router.put("/:id", validateActionId, validateAction, (req, res, next) => {
  Action.update(req.params.id, req.body)
    .then((updatedAction) => {
      res.status(200).json(updatedAction);
    })
    .catch(next);
});

router.delete("/:id", validateActionId, (req, res, next) => {
  Action.remove(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(next);
});

module.exports = router;
