import { db } from '../connect.js';

export const getUser = (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(422).json({ msg: 'É preciso o ID' });
  }

  db.query('SELECT username, userImg, bgImg FROM user WHERE id = ?', [id], (error, data) => {
    if (error) {
      console.log(error);
      res.status(500).json({ msg: 'Erro no servidor' });
    } else {
      return res.status(200).json(data);
    }
  });
};

export const updateUser = (req, res) => {
  const { username, userImg, bgImg, id } = req.body;

  // Pode ter outras condições de validação aqui, dependendo dos requisitos do seu sistema

  // Verifica se pelo menos uma alteração está sendo feita
  if (!username && !userImg && !bgImg) {
    return res.status(422).json({ msg: 'Sem alterações para serem feitas' });
  }

  if (username && !/^[a-zA-Z0-9_-]{3,16}$/.test(username)) {
    return res.status(422).json({ msg: 'Username inválido. Use apenas letras, números, "-" e "_", com 3 a 16 caracteres.' });
  }

  if (userImg && userImg.length > 300) {
    return res.status(422).json({ msg: 'O link da foto de perfil deve ter no máximo 300 caracteres.' });
  }

  if (bgImg && bgImg.length > 300) {
    return res.status(422).json({ msg: 'O link da imagem de capa deve ter no máximo 300 caracteres.' });
  }

  // Monta a parte dinâmica da query baseada nas alterações que estão sendo feitas
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

  // Executa a query apenas se houver campos para serem atualizados
  if (updateFields.length > 0) {
    const updateQuery = `UPDATE user SET ${updateFields.join(', ')} WHERE id = ?`;
    values.push(id);

    db.query(updateQuery, values, (error, data) => {
      if (error) {
        console.log(error);
        res.status(500).json({ msg: 'Erro no servidor' });
      } else {
        if (data.affectedRows > 0) {
          return res.status(200).json({ msg: 'Atualizado com sucesso' });
        } else {
          return res.status(400).json({ msg: 'Nenhum usuário encontrado para atualizar' });
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
      console.log(error);
      res.status(500).json({ msg: 'Erro no servidor' });
    } else {
      if (data.affectedRows > 0) {
        return res.status(200).json('Usuário excluído com sucesso');
      } else {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
      }
    }
  });
};
