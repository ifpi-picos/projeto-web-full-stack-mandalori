import { db } from '../connect.js';

export const addLikes = (req, res) => {
    const { likes_user_id, likes_post_id } = req.body;

    db.query('INSERT INTO likes SET ?', { likes_user_id, likes_post_id }, (error) => {
        if (error) {
            handleServerError(res, error);
        } else {
            res.status(200).json({ msg: 'Like dado com sucesso' });
        }
    });
};

export const deleteLikes = (req, res) => {
    const { likes_user_id, likes_post_id } = req.query;

    db.query(
        'DELETE FROM likes WHERE `likes_user_id` = ? AND `likes_post_id` = ?',
        [likes_user_id, likes_post_id],
        (error) => {
            if (error) {
                handleServerError(res, error);
            } else {
                res.status(200).json({ msg: 'Like deletado com sucesso' });
            }
        }
    );
};

export const getLikes = (req, res) => {
    const { likes_post_id } = req.query;

    db.query(
        'SELECT l.*, u.username FROM likes as l JOIN user as u ON (u.id = l.likes_user_id) WHERE likes_post_id = ?',
        [likes_post_id],
        (error, data) => {
            if (error) {
                handleServerError(res, error);
            } else if (data) {
                res.status(200).json({ data });
            }
        }
    );
};