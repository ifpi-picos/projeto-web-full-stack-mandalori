import jwt from 'jsonwebtoken';

// função para lidar com erros de token
const handleTokenError = (res, error) => {
    console.error(error);
    res.status(400).json({ msg: "Token inválido" });
};

// middleware para verificar o token
export const checkToken = (req, res, next) => {
    // obtém o cabeçalho de cookie da requisição
    const cookieHeader = req.headers.cookie?.split(';')[0];
    // extrai o token do cabeçalho de cookie
    const token = cookieHeader && cookieHeader.split('=')[1];

    // verifica se o token está presente
    if (token) {
        try {
            // verifica o token usando a chave secreta do servidor
            jwt.verify(token, process.env.TOKEN);
            // continua para a próxima middleware se o token for válido
            next();
        } catch (error) {
            // trata erros de validação do token
            handleTokenError(res, error);
        }
    } else {
        // retorna um código de status 401 se o token estiver ausente
        res.status(401).json({ msg: 'Acesso negado. Token ausente' });
    }
};
