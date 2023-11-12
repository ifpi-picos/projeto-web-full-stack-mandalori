import express from 'express';
import {addFriendship, getFriendship, deleteFriendship} from '../controllers/friendship.js'
import { checkToken } from '../middleware/tokenVallidation.js'


const router = express.Router();

router.post('/', checkToken, addFriendship)
router.get('/', checkToken, getFriendship)
router.delete('/', checkToken, deleteFriendship)

export default router;