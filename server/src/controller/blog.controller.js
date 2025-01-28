const Blogs = require("../models/Blog.model");
const ApiError = require("../utils/ApiErrors");
const asyncHandler = require("../utils/asyncHandler");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const Likes = require("../models/like.model");
const Saves = require("../models/save.model");
const Views = require("../models/views.model");



const getAllBlog = asyncHandler(async (req, res, next)=>{
    const blog = await Blogs.aggregate([
        {
            $lookup: {
                from : "users",
                localField : "author",
                foreignField : "_id",
                as : "author"
            }
        },
        {
            $unwind : "$author"
        },
        {
            $project:{
              "author.password" : 0,
              "author._id" : 0,
              "author.createdAt" : 0,
              "author.updatedAt" : 0,

            }
        }
    ])
    res.status(200).json({
        success : true,
        status : 200,
        message : "blog fetched successfully",
        data : blog,
    })
});


const getBlog = asyncHandler(async (req, res, next) => {
    const {id} = req.query;

    if(!id){
        throw new ApiError("blogId is missing", 401, "getBlog");
    }

    const blogExists = await Blogs.findOne({_id : new mongoose.Types.ObjectId(`${id}`)});

    if(!blogExists){
        throw new ApiError("blog not found", 404, "getBlog");
    }

    const increaseViews = await Views.findOne(
        {BlogId : new mongoose.Types.ObjectId(`${id}`)}, 
    );
    if(!increaseViews){
        await Views.create({
            BlogId : new mongoose.Types.ObjectId(`${id}`),
            views : 1
        });
    }else{
        await Views.findOneAndUpdate(
            {BlogId : new mongoose.Types.ObjectId(`${id}`)},
            {$inc : {views : 1}}
        );
    }

    const likeOnBlog = await Likes.find({blogId : new mongoose.Types.ObjectId(`${id}`)});
    
    if(!likeOnBlog){
        throw new ApiError("Like not found", 404, "getBlog");
    }

    const savesOnBlog = await Saves.find({blogId : new mongoose.Types.ObjectId(`${id}`)});

    const blog = await Blogs.aggregate([
        {
            $match :{
                _id : new mongoose.Types.ObjectId(`${id}`)
            }
        },
        {
            $lookup: {
                from : "users",
                localField : "author",
                foreignField : "_id",
                as : "author"
            }
        },
        {
            $unwind : "$author"
        },
        {
            $project:{
              "author.password" : 0,
              "author._id" : 0,
              "author.updatedAt" : 0,
            }
        }
    ]);

    res.status(200).json({
        success : true,
        status : 200,
        message : "blog fetched successfully",
        likes : likeOnBlog,
        saves : savesOnBlog,
        data : blog[0] 
    })
})

const newBlog = async (req, res, next) =>{
    try{    

        const { author,title, content, coverImage, status} = req.body;

        if(![author,title, content, coverImage, status].some((val)=> val !== "")){
            throw new ApiError("some fields is missing", 401, "newBlog");
        }

        if(status !== "draft" && status !== "published"){
            throw new ApiError("invalid status", 401, "newBlog");
        }

        if(author !== req.user._id.toString()){
            throw new ApiError("different authors are not allowed", 401, "newBlog");
        }

        const blog = await Blogs.create({
            author: req.user._id,
            heading : title,
            content,
            coverImage,
            status 
        });


        return res.status(201).json({
            success : true,
            data : blog
        });

    }
    catch(err){
        next(err);
    }
}



const coverImage = asyncHandler(async (req, res, next)=>{
    const path = req.file?.filename;

    if(!path){
        throw new ApiError("image is missing", 401, "uploadCoverImage");
    }

    const Image = `${process.env.SERVER}public/coverImage/${req.user._id}/${path}`;

    res.status(201).json({
        success : true,
        url: Image,
        name : path,
    })
});



const removeCoverImage = asyncHandler(async (req, res, next)=>{
    const {name} = req.query;

    if(!name){
        throw new ApiError("name is missing", 401, "removeCoverImage");
    }

    const imagePath = path.join(__dirname, `../../public/coverImage/${req.user._id}/${name}`);
    
    fs.unlinkSync(imagePath);

    res.status(200).json({
        success: true,
        message: "image deleted"
    });
});




const uploadImages = async (req, res, next) =>{
    try{
        const path = req.file?.filename;
        
        if(!path){
            throw new ApiError("image is missing", 401, "uploadBlogImages");
        }

        const Image = `${process.env.SERVER}public/blog/${req.user._id}/${path}`;

        res.status(201).json({
            success : true,
            url: Image,
            name : path,
        });

    }
    catch(err){
        console.log(err);
        next(err);
    }
}


const deleteImage = async (req, res, next) =>{
    try{
        const {name, id} = req.query;


        if(!name){
            throw new ApiError("name is missing", 401, "deleteImage");
        }

        const imagePath = path.join(__dirname, `../../public/blog/${req.user._id}/${name}`);

        if(id){
            const updataBlog = await Blog.findOneAndUpdata({
                _id : new mongoose.Types.ObjectId(`${id}`),
                coverImage :  null,
            })
        }

        fs.unlinkSync(imagePath);

        res.status(200).json({
            success: true,
            message: "image deleted"
        });
    }
    catch(err){
        next(err);
    }
}

module.exports = {
    getBlog,
    getAllBlog,
    newBlog,
    uploadImages,
    deleteImage,
    coverImage,
    removeCoverImage
}