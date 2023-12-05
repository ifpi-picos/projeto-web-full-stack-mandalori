import { db } from '../connect.js';

export const searchUser = (req, res) => {
    const params = `%${req.query.params}%`;

    if (!params) {
        return res.status(422).json({ msg: 'É preciso o parâmetro' });
    }

    db.query('SELECT username, userImg, id FROM user WHERE username LIKE ?', [params], (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).json({ msg: 'Erro no servidor' });
        } else {
            return res.status(200).json(data);
        }
    });
};

export const searchPost = (req, res) => {
    const params = `%${req.query.params}%`;

    if (!params) {
        return res.status(422).json({ msg: 'É preciso o parâmetro' });
    }

    db.query(
        'SELECT p.*, u.username, userImg FROM posts as p JOIN user as u ON (u.id = p.userId) WHERE p.post_desc LIKE ? OR u.username LIKE ? ORDER BY created_at DESC',
        [params, params],
        (error, data) => {
            if (error) {
                console.log(error);
                res.status(500).json({ msg: 'Erro no servidor' });
            } else {
                return res.status(200).json(data);
            }
        }
    );
};
