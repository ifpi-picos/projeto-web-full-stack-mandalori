import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  connectionLimit: 10, 
  connectTimeout: 60000,
  waitForConnections: true,
  queueLimit: 0, 
});

// função para conectar ao banco de dados
const connectToDatabase = () => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Erro ao conectar ao MySQL:', err);
      // lidar com o erro, por exemplo, tentar reconectar ou encerrar o aplicativo.
      setTimeout(connectToDatabase, 8000); // Tentar reconectar após 8 segundos
    } else {
      console.log('Conectado ao MySQL');

      // libera a conexão de volta para o pool quando não estiver mais em uso
      connection.release();
    }
  });

  // adicionar listener de erro para lidar com outros estados de erro e reconectar conforme necessário
  db.on('error', (err) => {
    console.error('Erro de Conexão MySQL:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ER_CON_COUNT_ERROR' || err.code === 'ECONNREFUSED') {
      connectToDatabase();
    } else {
      throw err;
    }
  });
};

// chamar a função de conexão ao banco de dados
connectToDatabase();

if (!db || db.state === 'disconnected') {
  // reconectar ou criar uma nova conexão, dependendo da sua implementação
  connectToDatabase();
}
