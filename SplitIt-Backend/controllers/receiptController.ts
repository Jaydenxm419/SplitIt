import path from 'path';
import fs from 'fs';

// Function to return the receipt data to the client
export const getReceiptData = (req, res) => {
    const file = req.file; // Access the uploaded file
    res.json({ filename: file.filename }); // Return the file name
};

// Function to return the image of the receipt to the client
export const getImage = (req, res) => {
    const { filename } = req.params; // Get the image file name
    const filePath = path.join(process.cwd(), 'uploads', filename); // Concatenate the image file location
    // Check if file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'Image not found' });
    }
    console.log("Sending image to client...", filename);
    res.sendFile(filePath);
};