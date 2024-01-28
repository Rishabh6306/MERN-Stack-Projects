import express from 'express';
import { getImage, uploadImage } from '../Controller/imagesController.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

const router = express.Router();

// Route for uploading a single file
router.post('/upload', upload.single('file'), uploadImage);

// Route for downloading a file by fileId
router.get('/file/:fileId', getImage);

export default router;