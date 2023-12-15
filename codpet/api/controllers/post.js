import { db } from '../connect.js';

export const createPost = (req, res) => {
    const { post_desc, img, userId } = req.body;

    if (!post_desc && !img) {
        return res.status(422).json({ msg: 'O post precisa de texto ou imagem' });
    }

    // Extrair o nome do arquivo da URL do Cloudinary
    const imgUrl = typeof img === 'object' ? img.url : img;
    const fileName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1);

    db.query('INSERT INTO posts SET ?', { post_desc, img: fileName, userId }, (error, results) => {
        if (error) {
            console.error(error);
            handleServerError(res, error);
        } else {
            console.log('Postagem feita com sucesso. ID:', results.insertId);
            res.status(200).json({ msg: 'Postagem feita com sucesso', postId: results.insertId });
        }
    });
};



export const getPost = (req, res) => {
    const userId = req.query.id;

    const query = userId
        ? 'SELECT p.*, u.username, userImg FROM posts as p JOIN user as u ON (u.id = p.userId) WHERE u.id = ? ORDER BY created_at DESC'
        : 'SELECT p.*, u.username, userImg FROM posts as p JOIN user as u ON (u.Id = p.userId) ORDER BY created_at DESC';

    db.query(query, [userId], (error, data) => {
        if (error) {
            handleServerError(res, error);
        } else if (data) {
            res.status(200).json({ data });
        }
    });
};

export const deletePost = (req, res) => {
    const postId = req.query.id;

    if (!postId) {
        return res.status(422).json({ msg: 'É preciso o ID da postagem a ser excluída' });
    }

    db.query('DELETE FROM posts WHERE id = ?', [postId], (error, data) => {
        if (error) {
            handleServerError(res, error);
        } else {
            if (data.affectedRows > 0) {
                res.status(200).json('Postagem excluída com sucesso');
            } else {
                res.status(404).json({ msg: 'Postagem não encontrada' });
            }
        }
    });
};