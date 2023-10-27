import express from 'express'
import {register} from '../controllers/auth.js'
import {login} from '../controllers/auth.js'
import {refresh} from '../controllers/auth.js'
import {logout} from '../controllers/auth.js'
import { checkToken } from '../middleware/tokenVallidation.js'
import { checkRefreshToken } from '../middleware/refreshTokenValidation.js'


const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/refresh', checkRefreshToken, refresh)
router.post('/logout', checkToken, logout)


export default router;