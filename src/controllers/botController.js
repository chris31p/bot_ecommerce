const { getRecommendations } = require("../services/recommendationService");
const { sendMessage } = require('../services/whatsappService');

const getUserRecommendations = async (req, res) => {
  const { userId } = req.params;

  try {
    const recommendations = await getRecommendations(userId);
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo recomendaciones" });
  }
};

const sendMessageTest = async (req, res) => {
  const { to, message } = req.body;

  try {
    const response = await sendMessage(to, message);
    res.status(200).json({
      message: "Mensaje enviado con éxito",
      sid: response.sid,
    });
  } catch (err) {
    res.status(500).json({
      error: "Error enviando mensaje",
      details: err.message,
    });
  }
};

module.exports = { getUserRecommendations, sendMessageTest };
