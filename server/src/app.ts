import express from "express";

const app = express();

// Ruta de prueba para la raíz
app.get("/", (req, res) => {
  res.send("¡Backend de ChewACookie funcionando! 🍪");
});

// Ruta para el proxy de Vite
app.get("/api", (req, res) => {
  res.json({ message: "Conexión exitosa con el frontend" });
});

export default app;
