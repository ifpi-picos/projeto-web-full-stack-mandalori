import { db } from '../connect.js';

export const getUser = (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(422).json({ msg: 'É preciso o ID' });
  }

  db.query('SELECT username, userImg, bgImg FROM user WHERE id = ?', [id], (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ msg: 'Erro ao obter usuário' });
    } else {
      return res.status(200).json(data);
    }
  });
};

export const updateUser = (req, res) => {
  const { username, userImg, bgImg, id } = req.body;

  if (!id) {
    return res.status(422).json({ msg: 'É preciso o ID' });
  }

  if (!username && !userImg && !bgImg) {
    return res.status(422).json({ msg: 'Sem alterações para serem feitas' });
  }

  // Outras validações de entrada...

  const updateFields = [];
  const values = [];

  if (username) {
    updateFields.push('username = ?');
    values.push(username);
  }

  if (userImg) {
    updateFields.push('userImg = ?');
    values.push(userImg);
  }

  if (bgImg) {
    updateFields.push('bgImg = ?');
    values.push(bgImg);
  }

  if (updateFields.length > 0) {
    const updateQuery = `UPDATE user SET ${updateFields.join(', ')} WHERE id = ?`;

    db.query(updateQuery, [...values, id], (error, data) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Erro ao atualizar usuário' });
      } else {
        if (data.affectedRows > 0) {
          return res.status(200).json({ msg: 'Usuário atualizado com sucesso' });
        } else {
          return res.status(404).json({ msg: 'Nenhum usuário encontrado para atualizar' });
        }
      }
    });
  } else {
    return res.status(422).json({ msg: 'Sem alterações para serem feitas' });
  }
};

export const deleteUser = (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(422).json({ msg: 'É preciso o ID' });
  }

  db.query('DELETE FROM user WHERE id = ?', [id], (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ msg: 'Erro ao excluir usuário' });
    } else {
      if (data.affectedRows > 0) {
        return res.status(200).json({ msg: 'Usuário excluído com sucesso' });
      } else {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
      }
    }
  });
};
