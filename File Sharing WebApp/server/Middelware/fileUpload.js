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

export default upload;