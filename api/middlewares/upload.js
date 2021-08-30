const util = require("util");
const multer = require("multer");
const path = require('path')
const maxSize = 2 * 1024 * 1024;
const fs = require('fs')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
        console.log(req.authen);
        let newName = new Date().getTime()
        try {
            newName = req.authen.sid
            fs.unlink(`${__dirname}../../uploads/${req.authen.sid}`)
        } catch (err) {
            console.log(err.message);
            console.log(`${newName} not old file`);
        }
        cb(null, `${newName}${path.extname(file.originalname)}`);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('ไฟล์ประเภท .png, .jpg and .jpeg format เท่านั้น!'));
        }
    }
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;