import {db} from '../connect.js'

export const addFriendship = (req, res) =>{
    const {follower_id, followed_id} = req.body;

    db.query('INSERT INTO friendship SET ?', {follower_id, followed_id}, (error)=>{
        if(error){
            console.log(error)
            return res.status(500).json({msg: 'erro no servidor'})
        }else{
            return res.status(200).json({msg: 'voce esta seguindo esta pessoa com sucesso'})
        }
    })
}

export const deleteFriendship = (req, res) => {
    const {follower_id, followed_id} = req.query;

    db.query("DELETE from friendship WHERE `follower_id` = ? AND `followed_id` = ?", [follower_id, followed_id], (error)=>{
        if(error){
            console.log(error)
            return res.status(500).json({msg: 'erro no servidor'})
        }
        else{
            return res.status(200).json({msg: 'voce nao esta mais seguindo esse usuario'})
        }
    
    })
}


export const getFriendship = (req, res)=>{
    db.query('SELECT f.*, u.username, userImg FROM friendship as f JOIN user as u ON (u.id = f.followed_id) WHERE follower_id = ?', 
    [req.query.follower_id], 
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