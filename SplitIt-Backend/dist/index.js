// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import receiptRoutes from './routes/receiptRoutes.js';
// Import routes
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
// Middleware
app.use(express.json());
// Example Route
app.get('/', (req, res) => {
    res.send('Ooga Booga');
});
app.use('/receipts', receiptRoutes); // Use the upload routes
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
