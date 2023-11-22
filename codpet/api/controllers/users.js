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

export const updateUser = (req, res) => {
  const { username, userImg, bgImg, id } = req.body;
  let updateFields = [];
  let updateValues = [];

  if (username) {
      updateFields.push('username = ?');
      updateValues.push(username);
  }

  if (userImg) {
      updateFields.push('userImg = ?');
      updateValues.push(userImg);
  }

  if (bgImg) {

  
      updateFields.push('bgImg = ?');
      updateValues.push(bgImg);
  }

  if (updateFields.length === 0) {
      return res.status(422).json({ msg: 'Sem alterações para serem feitas' });
  }

  

  const updateQuery = `UPDATE user SET ${updateFields.join(', ')} WHERE id = ?`;

  db.query(updateQuery, [...updateValues, id], (error, data) => {
      if (error) {
          console.log(error);
          return res.status(500).json({ msg: 'Erro no servidor' });
      }

      if (data.affectedRows > 0) {
          return res.status(200).json('Atualizado com sucesso');
      }
  });
};



export const deleteUser = (req, res) => {
    const id = req.query.id;
  
    if (!id) {
      return res.status(422).json({ msg: 'é preciso o id' });
    }
  
    db.query('DELETE FROM user WHERE id = ?', [id], (error, data) => {
      if (error) {
        console.log(error);
        res.status(500).json({ msg: 'erro no servidor' });
      } else {
        if (data.affectedRows > 0) {
          return res.status(200).json('usuário excluído com sucesso');
        } else {
          return res.status(404).json({ msg: 'usuário não encontrado' });
        }
      }
    });
  };