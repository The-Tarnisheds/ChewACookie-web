import express from "express";
import routes from "./routes";

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token')
  next()
})
app.use(express.json());

app.use('/api', routes);
// Ruta de prueba para la raíz
app.get("/", (req, res) => {
  res.send("¡Backend de ChewACookie funcionando! 🍪");
});


// Ruta para el proxy de Vite
app.get("/api", (req, res) => {
  res.json({ message: "Conexión exitosa con el frontend" });
});



export default app;
