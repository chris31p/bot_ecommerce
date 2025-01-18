const express = require("express");
const { getUserRecommendations, sendMessageTest } = require("../controllers/botController");
const router = express.Router();

router.get("/recommendations/:userId", getUserRecommendations);
router.post("/send-message", sendMessageTest);

module.exports = router;
