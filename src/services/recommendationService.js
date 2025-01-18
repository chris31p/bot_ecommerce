const Product = require('../models/Product');
const Cart = require('../models/Cart');

const getRecommendations = async(userId) =>{
    try {
        const cart = await Cart.findOne({user: userId}).populate("items.product");
        if (!cart){
            //Si no hay carrito, devolver productos
            return await Product.find().sort({popularity: -1}).limit(5);
        }

        //Obtener las categorías de los productos en el carrito
        const categories = cart.items.map((item)=> item.product.category);

        //Buscar productos similares en las mismas categorías, excluyendo aquellos que ya están en el carrito
        const recommendations = await Product.find({
            category: { $in: categories },
            _id: { $nin: cart.items.map((item) => item.product._id) },
        }).limit(5);

        return recommendations;
    } catch (error) {
        console.error("Error en recomendaciones: ", error.message);
        return [];
    }
}

module.exports = {getRecommendations};