import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


// Configuración de la conexión con PostgreSQL
const sequelize = new Sequelize(process.env.DB_DATABASE as string, process.env.DB_USER as string, process.env.DB_PASS as string,
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

export { sequelize };
