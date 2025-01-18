const Cart = require('../models/Cart');

const getAbandonedCarts = async(req, res) =>{
    try {
        const carts = await Cart.find({createdAt: {$lte: new Date() - 3600000}}); //Carritos abandonados hace 1 hora
        return res.json(carts);
    } catch (error) {
        return res.status(500).json({msg: "Error recuperando carritos"})
    }
};

module.exports = {getAbandonedCarts};