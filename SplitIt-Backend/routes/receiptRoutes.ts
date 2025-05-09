import express from 'express';
import multer from 'multer';
import { getReceiptData, getImage } from '../controllers/receiptController.js'; 

// Middleware
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Receipt file destination

// Routes
router.post('/upload', upload.single('image'), getReceiptData); // POST receipt image
router.get('/:filename', getImage); // GET receipt image

// Export
export default router;
