const express = require("express");
const { register, login, verifyUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Rutas públicas
router.post("/register", register);
router.post("/login", login);

// Ruta protegida
router.get("/verify", authMiddleware, verifyUser);

module.exports = router;
