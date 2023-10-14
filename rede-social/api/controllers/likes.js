import {db} from '../connect.js'

export const addLikes = (req, res) =>{
    const {likes_user_id, likes_post_id} = req.body;

    db.query('INSERT INTO likes SET ?', {likes_user_id, likes_post_id}, (error)=>{
        if(error){
            console.log(error)
            return res.status(500).json({msg: 'erro no servidor'})
        }else{
            return res.status(200).json({msg: 'like dado com sucesso'})
        }
    })
}

export const deleteLikes = (req, res) => {
    const {likes_user_id, likes_post_id} = req.query;

    db.query("DELETE from likes WHERE `likes_user_id` = ? AND `likes_post_id` = ?", [likes_user_id, likes_post_id], (error)=>{
        if(error){
            console.log(error)
            return res.status(500).json({msg: 'erro no servidor'})
        }
        else{
            return res.status(200).json({msg: 'like deletado com sucesso'})
        }
    
    })
}


export const getLikes = (req, res)=>{
    db.query('SELECT l.*, u.username FROM likes as l JOIN user as u ON (u.id = l.likes_user_id) WHERE likes_post_id = ?', 
    [req.query.likes_post_id], 
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