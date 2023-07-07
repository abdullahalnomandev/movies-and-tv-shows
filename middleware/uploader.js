import multer from "multer";
import path from "path";
import AppError from "../utils/appError.js";

const storage = multer.diskStorage({
    destination: "images/",
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        callback(null, uniqueSuffix + "_"+ file.originalname)
    }
})

const uploader = multer({
    storage,
    fileFilter: (req, file, callback) => {
        const supportedImage = /png|jpg/;
        const extension = path.extname(file.originalname);
        console.log(/png|jpg/.test(".png"))

        if (supportedImage.test(extension)) {
            callback(null, true)
        } else {
            callback(new AppError("Must be a png/jpg image", 400))
        }
    },
    limits: {
        fileSize: 5000000,
    }
})

export default uploader;