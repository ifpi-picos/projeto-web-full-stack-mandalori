import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  connectionLimit: 10, // Número máximo de conexões no pool
  connectTimeout: 60000,
  waitForConnections: true, // Aguarde até que uma conexão esteja disponível no pool
  queueLimit: 0, // Sem limite para a fila de conexões pendentes
});

// Função para conectar ao banco de dados
const connectToDatabase = () => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Erro ao conectar ao MySQL:', err);
      // Lidar com o erro, por exemplo, tentar reconectar ou encerrar o aplicativo.
      setTimeout(connectToDatabase, 8000); // Tentar reconectar após 8 segundos
    } else {
      console.log('Conectado ao MySQL');

      // Libere a conexão de volta para o pool quando não estiver mais em uso
      connection.release();
    }
  });

  // Adicionar listener de erro para lidar com outros estados de erro e reconectar conforme necessário
  db.on('error', (err) => {
    console.error('Erro de Conexão MySQL:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ER_CON_COUNT_ERROR' || err.code === 'ECONNREFUSED') {
      connectToDatabase();
    } else {
      throw err;
    }
  });
};

// Chamar a função de conexão ao banco de dados
connectToDatabase();

if (!db || db.state === 'disconnected') {
  // Reconectar ou criar uma nova conexão, dependendo da sua implementação
  connectToDatabase();
}
