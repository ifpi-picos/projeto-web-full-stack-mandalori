import { db } from '../connect.js';

export const addFriendship = (req, res) => {
    const { follower_id, followed_id } = req.body;

    db.query('INSERT INTO friendship SET ?', { follower_id, followed_id }, (error) => {
        if (error) {
            handleServerError(res, error);
        } else {
            res.status(200).json({ msg: 'Você está seguindo esta pessoa com sucesso' });
        }
    });
};

export const deleteFriendship = (req, res) => {
    const { follower_id, followed_id } = req.query;

    db.query(
        "DELETE FROM friendship WHERE `follower_id` = ? AND `followed_id` = ?",
        [follower_id, followed_id],
        (error) => {
            if (error) {
                handleServerError(res, error);
            } else {
                res.status(200).json({ msg: 'Você não está mais seguindo esse usuário' });
            }
        }
    );
};

export const getFriendship = (req, res) => {
    const { follower_id } = req.query;

    db.query(
        `SELECT f.*, u.username, userImg FROM friendship as f JOIN user as u ON (u.id = f.followed_id) WHERE follower_id = ?`,
        [follower_id],
        (error, data) => {
            if (error) {
                handleServerError(res, error);
            } else if (data) {
                res.status(200).json({ data });
            }
        }
    );
};