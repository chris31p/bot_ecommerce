const express = require("express");
const { getUserRecommendations, sendMessageTest } = require("../controllers/botController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/recommendations/:userId", getUserRecommendations);
router.post("/send-message", authMiddleware.authenticateToken, sendMessageTest);

module.exports = router;
