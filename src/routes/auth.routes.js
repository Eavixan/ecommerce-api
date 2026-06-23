const express = require("express");
const router = express.Router();

const { signup, login, testDB } = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/login", login);

// TEST DB ROUTE
router.get("/test-db", testDB);

module.exports = router;