import express from 'express';
import { upload, uploadController } from '../controllers/upload.js';

const router = express.Router();

// middleware que chama a próxima função (upload.single) na cadeia de manipulação de middleware.
router.post('/', (req, res, next) => {
  next();
}, upload.single('file'), uploadController);

export default router;
