import jwt from 'jsonwebtoken';

// função de middleware para verificar o token de atualização
export const checkRefreshToken = async (req, res, next) => {
    // obtém o cabeçalho de cookie da requisição
    const authHeader = req.headers.cookie?.split(';')[1];
    // extrai o token de atualização do cabeçalho de cookie
    const refreshToken = authHeader && authHeader.split('=')[1];

    // verifica se o token de atualização está presente
    if (refreshToken) {
        try {
            // verifica e decodifica o token de atualização usando a chave secreta do servidor
            const decodedToken = await jwt.verify(refreshToken, process.env.REFRESH);
            // adiciona o ID do usuário ao objeto req para uso posterior
            req.userId = decodedToken.id;
            // continua para a próxima middleware se o token for válido
            next();
        } catch (error) {
            // trata erros de validação do token de atualização
            console.error(error);
            res.status(400).json({ msg: "Token inválido ou expirado" });
        }
    } else {
        // retorna um código de status 401 se o token de atualização estiver ausente
        return res.status(401).json({ msg: 'Acesso negado. Token de atualização ausente' });
    }
};
