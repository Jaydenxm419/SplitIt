import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const getReceiptData = (req, res) => {
    const file = req.file; // Access the uploaded file
    console.log(file, "HELLO");
    res.json({ filename: req.file.filename }); // Only return the filename
};
export const getImage = (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(process.cwd(), 'uploads', filename);
    console.log(filePath);
    // Check if file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'Image not found' });
    }
    console.log("Sending image to client...", filename);
    res.sendFile(filePath);
};
