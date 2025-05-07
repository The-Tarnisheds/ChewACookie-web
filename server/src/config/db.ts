import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


// Configuración de la conexión con PostgreSQL
const sequelize = new Sequelize(process.env.DB_DATABASE as string, process.env.DB_USER as string, process.env.DB_PASS as string,
  {
    host: 'db.jxgirxcobpfnhejfbxux.supabase.co',
    dialect: 'postgres',
    logging: false,
    port: 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Necesario para Supabase
      },
    },
  }
);

export { sequelize };
