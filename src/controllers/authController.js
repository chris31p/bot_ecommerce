const bcrypt = require("bcryptjs"); // Para el hashing de contraseñas
const jwt = require("jsonwebtoken"); // Para generar tokens JWT
const User = require("../models/User");
const Cart = require("../models/Cart"); // Modelo del carrito

// Llave secreta para JWT (debería estar en una variable de entorno)
const JWT_SECRET = process.env.JWT_SECRET || "tu_llave_secreta";

// Controlador para registrar un usuario y crear un carrito vacío
exports.registerUser = async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    // Verifica si ya existe un usuario con el mismo teléfono o correo
    const existingUser = await User.findOne({ $or: [{ phone }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        message: "El teléfono o correo ya están registrados.",
      });
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario
    const user = new User({ name, phone, email, password: hashedPassword });

    // Guarda el usuario temporalmente para obtener su ID
    await user.save();

    // Crea un carrito vacío y asígnalo al usuario
    const cart = new Cart({ items: [], total: 0 });
    await cart.save();

    // Vincula el carrito al usuario
    user.cart = cart._id;
    await user.save();

    res.status(201).json({
      message: "Usuario registrado y carrito creado con éxito.",
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        cart: user.cart,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al registrar el usuario.",
      error,
    });
  }
};

// Controlador para el login de usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca al usuario por correo
    const user = await User.findOne({ email }).populate("cart");

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado.",
      });
    }

    // Verifica la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Contraseña incorrecta.",
      });
    }

    // Genera un token JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
      JWT_SECRET,
      { expiresIn: "1h" } // Token válido por 1 hora
    );

    res.status(200).json({
      message: "Login exitoso.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        cart: user.cart,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al iniciar sesión.",
      error,
    });
  }
};
