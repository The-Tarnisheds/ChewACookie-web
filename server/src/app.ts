import express from "express";
import routes from "./routes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware para encabezados CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token"
  );
  next();
});

const allowedOrigins = [
  "https://rt2c7pr1-5173.brs.devtunnels.ms",
  "http://localhost:5173",
  "https://bb57d3vq-5173.brs.devtunnels.ms",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ✅ Recorremos cada router del arreglo
routes.forEach((route) => {
  app.use("/api", route);
});

// Ruta de prueba para la raíz
app.get("/", (req, res) => {
  res.send("¡Backend de ChewACookie funcionando! 🍪");
});

// Ruta para comprobar conexión desde el frontend
app.get("/api", (req, res) => {
  res.json({ message: "Conexión exitosa con el frontend" });
});

export default app;
