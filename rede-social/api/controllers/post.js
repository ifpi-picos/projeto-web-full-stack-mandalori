import {db} from '../connect.js'

export const createPost = (req, res) =>{
    const {post_desc, img, userId} = req.body;

    if(!post_desc && !img ){
        return res.status(422).json({msg: 'o post precisa de texto ou imagem'})
    }

    db.query('INSERT INTO posts SET ?', {post_desc, img, userId}, (error)=>{
        if(error){
            console.log(error)
            return res.status(500).json({msg: 'erro no servidor'})
        }else{
            return res.status(200).json({msg: 'postagem feita com sucesso'})
        }
    })
}
export const getPost = (req, res)=>{
    db.query('SELECT p.*, u.username, userImg FROM posts as p JOIN user as u ON (u.Id = p.userId) ORDER BY created_at DESC', (error, data)=>{
        if(error){
            console.log(error)
            return res.status(500).json({msg: 'erro no servidor'})
        }else if(data){
            console.log(data)
            return res.status(200).json({data})

        }
    })
}