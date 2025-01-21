const multer = require("multer");
const fs = require("fs");



const uploadProfilePic = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb)=>{
            return cb(null, './public/profile');
        },
        filename: (req, file, cb)=>{
            return cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '')}`);
        }
    }),

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
            return cb(multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
        }
        return cb(null, true);
    },

});



const uploadBlogImage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb)=>{
            if(!fs.existsSync(`./public/blog/${req?.user._id}`)){
                fs.mkdirSync(`./public/blog/${req?.user._id}`);
            }
            return cb(null, `./public/blog/${req?.user._id}`);
        },
        filename: (req, file, cb)=>{
            return cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '')}`);
        }
    }),

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
            return cb(multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
        }
        return cb(null, true);
    }

})


const uploadCoverImage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb)=>{
            if(!fs.existsSync(`./public/coverImage/${req?.user._id}`)){
                fs.mkdirSync(`./public/coverImage/${req?.user._id}`);
            }
            return cb(null, `./public/coverImage/${req?.user._id}`);
        },
        filename: (req, file, cb)=>{
            return cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '')}`);
        }
    }),

    limits: {
        fileSize: 5 * 1024 * 1024,
    },

    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
            return cb(multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
        }
        return cb(null, true);
    }

})


module.exports = {uploadProfilePic, uploadBlogImage, uploadCoverImage};


