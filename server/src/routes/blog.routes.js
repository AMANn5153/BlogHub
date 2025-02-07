const express = require("express");
const { newBlog, 
    uploadImages, 
    deleteImage, 
    coverImage, 
    removeCoverImage, 
    getAllBlog,
    getBlog,
    getAllBlogOfUser
} = require("../controller/blog.controller.js");
const  authenticate  = require("../middleware/authenticate.middleware.js");
const {uploadBlogImage, uploadCoverImage} = require("../middleware/multer.middleware.js");


const blogRouter = express.Router();

blogRouter.route("/getAllBlog").get(getAllBlog);

blogRouter.route("/getBlog").get(getBlog);

blogRouter.route("/newBlog").post(authenticate,  newBlog);

blogRouter.route("/uploadImage").post(authenticate, uploadBlogImage.single("image"), uploadImages);

blogRouter.route("/deleteImage").delete(authenticate, deleteImage);

blogRouter.route("/uploadCoverImage").post(authenticate, uploadCoverImage.single("image"), coverImage);

blogRouter.route("/deleteCoverImage").delete(authenticate, removeCoverImage);

blogRouter.route("/blogOfUser").get(authenticate, getAllBlogOfUser);

module.exports = blogRouter;