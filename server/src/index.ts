import app from "./app";
import dotenv from 'dotenv';
import sequelize from "./config/db";

dotenv.config();

const PORT = 3000;

// app.listen(PORT, () => {
//   console.log(`Servidor en http://localhost:${PORT}`);
//   // Verificar la conexión a la bd
// sequelize
// .authenticate()
// .then(() => {
//   console.log('Connection with db has been established successfully.');
// })
// .catch((err: Error) => {
//   console.error('Unable to connect to the database:', err);
// });
// });

sequelize.authenticate()
  .then(() => console.log('✅ Conectado a Azure SQL'))
  .catch((err: any) => console.error('❌ Error al conectar:', err));

app.listen(3000, () => {
  console.log('🚀 Servidor corriendo en puerto 3000');
});

//SUPABASE
// async function startServer() {
//   try {
//     await sequelize.authenticate();
//     console.log("✅ Conexión a Supabase PostgreSQL establecida con éxito");

//     app.listen(PORT, () => {
//       console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error("❌ No se pudo conectar a la base de datos:", error);
//     process.exit(1); // corta la app si no conecta a la base
//   }
// }

// startServer();
