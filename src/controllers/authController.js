const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Aquí validarías el usuario en la base de datos
  const user = { id: 1, username }; // Simulación de usuario encontrado

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

module.exports = { loginUser };
