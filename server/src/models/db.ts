const { Pool } = require('pg');
require('dotenv').config();

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME, // asegurate de que coincida con .env
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT), // TypeScript feliz 😎
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

module.exports = pool;