import jwt from 'jsonwebtoken'

export const checkRefreshToken = (req, res, next) =>{
    const authHeader = req.headers.cookie?.split(';')[1]
    const refreshToken = authHeader && authHeader.split('=')[1]

    if (refreshToken){
        try{
            jwt.verify(refreshToken, process.env.REFRESH)
            next()
        }catch(error){
            console.log(error)
            res.status(400).json({msg: "token invalido"})
        }
    }else{
        return res.status(401).json({msg: 'acesso negado'})
    }
}