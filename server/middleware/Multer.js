const express = require('express');
const multer = require('multer');

const router = express.Router();

function Storage() {
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads/'); // directory to store uploaded files
        },
        filename: function(req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname); // unique file name
        }
    });

    return storage;
}

// Initialize multer with the storage engine and handle multiple fields
const upload = multer({ storage: Storage() });

// Configure multer to handle both videos and documents
const uploadMultiple = upload.fields([
    { name: 'videos', maxCount: 10 },    // Up to 10 video files
    { name: 'documents', maxCount: 10 }, // Up to 10 document files
]);

// Export the multiple fields upload configuration
module.exports = uploadMultiple;
