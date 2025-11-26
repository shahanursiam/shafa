const express = require("express");
const { signup, login } = require("../controllers/authcontroller");
const { signupvalidation, loginvalidation } = require("../middlewares/authvalidation");
const router = express.Router();

router.post("/signup", signupvalidation, signup);
router.post("/login", loginvalidation, login);

module.exports = router;
