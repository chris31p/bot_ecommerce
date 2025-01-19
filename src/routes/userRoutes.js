const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
//const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Rutas públicas
router.post("/register", registerUser);
router.post("/login", loginUser);

// Ruta protegida
//router.get("/verify", authMiddleware, verifyUser);

module.exports = router;
