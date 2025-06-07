// //import { Sequelize } from 'sequelize';
// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST,
    dialect: 'mssql',
    logging: (msg) => console.log(msg),
    port: Number(process.env.DB_PORT) || 1433,
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: false
      }
      
    }
  }
);

export default sequelize;
// dotenv.config();
// //Conexion local
// // const sequelize = new Sequelize(
// //   process.env.DB_DATABASE!,
// //   process.env.DB_USER!,
// //   process.env.DB_PASS,
// //   {
// //     host: process.env.DB_HOST,
// //     port: Number(process.env.DB_PORT),
// //     dialect: 'postgres',
// //     logging: false,
// //   }
// // );

// // export { sequelize };
// src/config/db.ts
