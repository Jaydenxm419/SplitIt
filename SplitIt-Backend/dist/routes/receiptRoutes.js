import express from 'express';
import multer from 'multer';
import { getReceiptData } from '../controllers/receiptController.js'; // Use .js if you're running compiled JS from `dist/`
import { getImage } from '../controllers/receiptController.js';
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
router.post('/upload/receipt', upload.single('image'), getReceiptData);
router.get('/image/:filename', getImage);
export default router;
