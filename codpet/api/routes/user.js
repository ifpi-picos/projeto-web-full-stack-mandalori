import express from 'express'
import { getUser, updateUser, deleteUser } from '../controllers/users.js';
import { checkToken } from '../middleware/tokenVallidation.js'

const router = express.Router();

router.get('/get-user', getUser);
router.put('/update-user', checkToken, updateUser); 
router.delete('/delete-user', checkToken, deleteUser) 

export default router

