import express from 'express'
import {createComment, getComment} from '../controllers/comment.js'
import { checkToken } from '../middleware/tokenVallidation.js'
import { checkRefreshToken } from '../middleware/refreshTokenValidation.js'


const router = express.Router()

router.post('/', checkRefreshToken , createComment);
router.get('/', checkToken, getComment);

export default router;