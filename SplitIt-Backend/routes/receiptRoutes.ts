import express from 'express';
import multer from 'multer';
import { getReceiptData, getImage, postReceiptImageToAPI, getReceiptJsonFromAPI } from '../controllers/receiptController.js'; 

// Middleware
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Receipt file destination

// Routes
router.post('/upload', upload.single('image'), getReceiptData); // POST receipt image
router.get('/:filename', getImage); // GET receipt image
router.post('/api/send/:filename', postReceiptImageToAPI)
router.get('/api/return/:document_id', getReceiptJsonFromAPI)

// Export
export default router;
