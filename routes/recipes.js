const express = require("express");
const router = express.Router();
const model = require("../models/index");
const jwt = require("jsonwebtoken");

const RecipesController = require("../controllers/recipes.controller");

router.get("/", RecipesController.get);
module.exports = router;
