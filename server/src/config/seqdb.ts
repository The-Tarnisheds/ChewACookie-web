import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgresql://postgres:141099JCfr*-@db.jxgirxcobpfnhejfbxux.supabase.co:5432/postgres', {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // a veces necesario para conectar con Supabase
    }
  }
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión con Supabase PostgreSQL exitosa');
  } catch (error) {
    console.error('No se pudo conectar:', error);
  }
}

testConnection();
