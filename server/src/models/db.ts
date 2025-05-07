const { Pool } = require('pg');
require('dotenv').config();

// Configuración de la conexión a PostgreSQL
const pool = new Pool(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  });

module.exports = pool;