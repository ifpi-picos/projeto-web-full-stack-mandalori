import express from 'express';
import { upload, uploadController } from '../controllers/upload.js';

const router = express.Router();

router.post('/', (req, res, next) => {
  console.log('Chegou na rota de upload');
  next();
}, upload.single('file'), uploadController);

export default router;
