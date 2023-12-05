import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
});

// Função para conectar ao banco de dados
const connectToDatabase = () => {
  db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao MySQL:', err);
      // Lidar com o erro, por exemplo, tentar reconectar ou encerrar o aplicativo.
      setTimeout(connectToDatabase, 2000); // Tentar reconectar após 2 segundos
    } else {
      console.log('Conectado ao MySQL');
    }
  });

  // Adicionar listener de erro para evitar que o aplicativo quebre em caso de erros após a conexão inicial
  db.on('error', (err) => {
    console.error('Erro de Conexão MySQL:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Reconectar ou lidar com o erro de maneira apropriada.
      // Você pode querer implementar uma estratégia de espera crescente para evitar tentativas constantes de reconexão.
      connectToDatabase();
    } else {
      throw err;
    }
  });
};

// Chamar a função de conexão ao banco de dados
connectToDatabase();
