import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const getReceiptData = (req: Request, res: Response) => {
  const file = req.file; // Access the uploaded file
  console.log(file, "HELLO")
  res.json({ filename: req.file.filename }); // Only return the filename
};

export const getImage = (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../uploads', filename);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Image not found' });
  }

  console.log("Sending image to client...", filename);
  res.sendFile(filePath);
};