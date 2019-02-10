const express = require("express");
router = express.Router();

const controllers = require("../controllers/auth.controller");

router.get("/login", controllers.index);

router.post("/login", controllers.loginPost);

module.exports = router;