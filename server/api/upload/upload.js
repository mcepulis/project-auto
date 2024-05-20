import express from 'express';
import multer from 'multer';
import path from 'path';

export const uploadRouter = express.Router();

uploadRouter.use((req, res, next) => {
    if (req.user.role === 'public') {
        return res.send(JSON.stringify({
            type: 'error',
            message: 'Login to use this API endpoint',
        }));
    }

    next();
});

const carStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/upload/car');
    },
    filename: (req, file, cb) => {
        cb(null, 'car_' + Date.now() + path.extname(file.originalname));
    },
});

const carUpload = multer({
    storage: carStorage,
    limits: {
        fileSize: 1e6,
    }
});

uploadRouter.use('/car', carUpload.single('car_image'), (req, res) => {
    return res.send(JSON.stringify({
        type: 'success',
        message: 'Car image uploaded',
        imgPath: 'http://localhost:4821/img/upload/car/' + req.file.filename,
    }));
});