import app from "./app";
import dotenv from 'dotenv';
import {sequelize} from "./config/db";

dotenv.config();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
  // Verificar la conexión a la bd
sequelize
.authenticate()
.then(() => {
  console.log('Connection with db has been established successfully.');
})
.catch((err: Error) => {
  console.error('Unable to connect to the database:', err);
});
});
