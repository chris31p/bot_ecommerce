const express = require('express');
const {getAbandonedCarts} = require('../controllers/cartController');

const router = express.Router();

router.get("/abandoned", getAbandonedCarts);

module.exports = router;