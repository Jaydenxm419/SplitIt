// index.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())

// Middleware
app.use(express.json());

// Example Route
app.get('/', (req, res) => {
  res.send('Ooga Booga');
});

const upload = multer({ dest: 'uploads/' });
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve files from uploads/

app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file); // should now log file info
  res.send({ imageUri: req.file });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
