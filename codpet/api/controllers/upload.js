import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

// configura o Cloudinary com as credenciais da API provenientes de variáveis de ambiente
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// configura o armazenamento de arquivos para o Multer com uma função de nome de arquivo personalizada
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    // gera um nome de arquivo único usando o timestamp atual e o nome original do arquivo
    cb(null, Date.now() + file.originalname);
  },
});

// cria uma instância do middleware Multer com as configurações de armazenamento definidas
export const upload = multer({ storage: storage });

// função controladora para lidar com uploads de arquivos
export const uploadController = async (req, res) => {
  // recupera o arquivo enviado da requisição
  const file = req.file;

  // verifica se um arquivo foi fornecido
  if (!file) {
    // se nenhum arquivo, retorna uma resposta 400 Bad Request com uma mensagem de erro
    return res.status(400).json({
      error: 'nenhum arquivo enviado ou o campo do formulário está incorreto.',
    });
  }

  try {
    // faz o upload do arquivo para o Cloudinary com opções específicas
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'codpet',
      allowedFormats: ['jpg', 'png', 'jpeg'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }],
    });

    // responde com um status 200 OK, mensagem de sucesso, nome original do arquivo e URL do Cloudinary
    res.status(200).json({
      message: 'upload bem-sucedido',
      filename: result.original_filename,
      url: result.secure_url,
    });

    // registra a URL do Cloudinary (será executado apenas se o upload for bem-sucedido)
    //console.log(result.secure_url);
  } catch (error) {
    // manipula erros durante o processo de upload
    console.error('erro ao fazer upload para o Cloudinary:', error);
    // responde com um status 500 Internal Server Error e uma mensagem de erro
    res.status(500).json({ error: 'erro ao fazer upload para o Cloudinary.' });
  }
};
