const express = require("express");
const server = express();
server.use(express.json());

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use("*", (req, res, next) => {
  console.log(`hitting${req.method} and ${req.baseUrl}`);
  next({ status: 404, message: "not found" });
});

server.use((err, req, res) => {
  //error handling middleware
  // shoots back a response to the client if anything goes wrong in any of the middlewares that preceed this one
  res.status(err.status || 500).json({ message: `Horror: ${err.message}` });
});

module.exports = server;
