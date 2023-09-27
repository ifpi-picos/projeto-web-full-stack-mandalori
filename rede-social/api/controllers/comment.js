import {db} from '../connect.js'

export const createComment = (req, res) =>{
    const {comment_desc, post_id, comment_user_id} = req.body;

    if(!comment_desc){
        return res.status(422).json({msg: 'o comentario precisa de texto'})
    }

    db.query('INSERT INTO comments SET ?', {comment_desc, post_id, comment_user_id}, (error)=>{
        if(error){
            console.log(error)
            return res.status(500).json({msg: 'erro no servidor'})
        }else{
            return res.status(200).json({msg: 'comentario feita com sucesso'})
        }
    })
}
export const getComment = (req, res)=>{
    db.query('SELECT c.*, u.username, userImg FROM comments AS c JOIN user AS u ON (u.Id = c.comment_user_id) WHERE post_id = ? ORDER BY created_at ASC ', 
    [req.query.post_id],
    (error, data)=>{
        if(error){
            console.log(error)
            return res.status(500).json({msg: 'erro no servidor'})
        }else if(data){
            console.log(data)
            return res.status(200).json({data})

        }
    })
}