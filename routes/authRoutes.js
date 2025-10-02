const express = require("express");
const { signup, login, getUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// public routes
router.post("/signup", signup);
router.post("/login", login);

// protected route
router.get("/me", authMiddleware, getUser);

module.exports = router;
