import express from 'express'
import {createPost, getPost, deletePost} from '../controllers/post.js'
//import {addLikes, GetLikes} from '../controllers/likes.js.js'
import { checkToken } from '../middleware/tokenVallidation.js'
import { checkRefreshToken } from '../middleware/refreshTokenValidation.js'


const router = express.Router()

router.post('/', checkRefreshToken , createPost, deletePost)
router.get('/', checkToken, getPost)


export default router;