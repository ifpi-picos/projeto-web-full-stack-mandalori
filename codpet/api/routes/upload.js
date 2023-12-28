import express from 'express';
import { upload, uploadController } from '../controllers/upload.js';

const router = express.Router();

router.post('/', (req, res, next) => {
  next();
}, upload.single('file'), uploadController);

export default router;
