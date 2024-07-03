const { connect } = require('mssql');
require('dotenv/config');

//Configuracion de la conexion del API a la base de datos
const config = {
  server: process.env.MSSQL_HOST,
  database: process.env.MSSQL_DATABASE,
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  port: parseInt(process.env.MSSQL_PORT),
  options: {
    encrypt: false,
    trustServerCertificate: true,
    cryptoCredentialsDetails: {
      minVersion: 'TLSv1',
    },
  },
};


//Conexion de la base de datos 
const getConnection = async () => {
  try {
    const pool = await connect(config);
    return pool;
  } catch (error) {
    console.error('Error en la conexión:', error.message);
    throw error;
  }
};

module.exports = { getConnection };
