import path from 'path';
import fs from 'fs';
// Replace with your actual DocuPanda API key
const API_KEY = "HgLoaCQC0rXdsFGace0670HVXCc2";
const URL = "https://app.docupanda.io/document";
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
export const postReceiptImageToAPI = (req, res) => {
    const { filename } = req.params; // Get the image file name
    console.log(filename);
    const filePath = path.join(process.cwd(), 'uploads', filename); // Concatenate the image file location
    const fileContents = fs.readFileSync(filePath);
    const base64Content = Buffer.from(fileContents).toString('base64'); // Convert image to blob
    // Construct the JSON payload
    const payload = {
        document: {
            file: {
                contents: base64Content,
                filename: filePath
            }
        }
    };
    // Make the POST request with JSON payload
    fetch(URL, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-API-Key": API_KEY
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
        const document_id = data.documentId;
        console.log("Document ID:", document_id);
        res.json({ document_id }); // Return the document ID to the client
    })
        .catch(error => {
        console.log(":)");
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to upload image and get document ID.' });
    });
};
export const getReceiptJsonFromAPI = (req, res) => {
    const document_id = req.params.document_id; // Get the document ID from the client
    const URL = `https://app.docupanda.io/document/${document_id}`;
    fetch(URL, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "X-API-Key": "demo-api-key"
        }
    })
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(error => console.error(error));
};
