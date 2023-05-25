// api.js
import axios from "axios";
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("../bd/db.json");
const middlewares = jsonServer.defaults();

const API_URL = "http://localhost:3001";

server.use(router);
server.listen(3001, () => {
  console.log("JSON Server está corriendo en http://localhost:3001");
});

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { username, password },
    });
    return response.data[0];
  } catch (error) {
    throw new Error("Error de inicio de sesión");
  }
};

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Agregar una nueva ruta para el inicio de sesión
server.post("/login", (req: any, res: any) => {
  const { username, password } = req.body;
  const user = router.db.get("users").find({ username, password }).value();

  if (user) {
    res
      .status(200)
      .json({ success: true, message: "Inicio de sesión exitoso" });
  } else {
    res.status(401).json({
      success: false,
      message: "Nombre de usuario o contraseña incorrectos",
    });
  }
});
