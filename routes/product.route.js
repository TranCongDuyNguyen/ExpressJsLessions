const express = require('express');
const router = express.Router();

const controllers = require("../controllers/product.controller");

router.get("/", controllers.index);
router.get("/addtocart/:productId", controllers.addToCart);

module.exports = router;