import {db} from '../connect.js'

export const getUser = (req, res) =>{

    const id = req.query.id

    if(!id){
        return res.status(422).json({msg: 'é preciso o id'})
    }

    db.query('SELECT username, userImg, bgImg FROM user WHERE id = ?', [id], (error, data)=>{
        if (error){
            console.log(error)
            res.status(500).json({msg: 'erro no servidor'})
        }
        else{
            return res.status(200).json(data)
        }
    })
}