const express = require("express");
const roleRouter = express.Router();

const { createRole, getAllRoles } = require("./../controllers/role");

roleRouter.post("/createRole", createRole);
roleRouter.get("/roles", getAllRoles);

module.exports = roleRouter;
