const User = require("../models/user.model");
const mongoose = require("mongoose");
const Blogs = require("../models/Blog.model");
const ApiError = require("../utils/ApiErrors");
const fs = require("fs")
const template = require("../views/templateEngine");
const puppeteer = require("puppeteer");
const {Blob} = require("buffer");
const nodemailer = require("nodemailer");
const path = require("path");




const getPdf = async (req, res) => {
    const _id = req.query.id;
    const blogId = req.query.blogId;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    if(!_id){
        throw new ApiError("id is required", 400);
    }

    const user = await User.findOne({_id : new mongoose.Types.ObjectId(`${_id}`)});

    if(!user){
        throw new ApiError("user not found", 404);
    }

    const blogs = await Blogs.findOne({author : user._id , _id : new mongoose.Types.ObjectId(`${blogId}`)}).populate("author");

    const templateData = template({
        authors : user.name,
        heading : blogs.heading,
        content : blogs.content
    });


    await page.setContent(templateData);

    const pdf = await page.pdf();



    fs.writeFileSync(`./public/pdf/blog.pdf`,pdf);

    res.download(`./public/pdf/blog.pdf`,(err)=>{
        if(err) throw err;
        else{ 
            fs.unlinkSync(`./public/pdf/blog.pdf`);
        }    
    });

    await browser.close();
    
  
}


const mailPdf = async (req, res)=>{
    const _id = req.query.id;
    const blogId = req. query.blogId;

    if(!_id){
        throw new ApiError("id is required", 400);
    }

    const user = await User.findOne({_id : new mongoose.Types.ObjectId(`${_id}`)});
    
    if(!user){
        throw new ApiError("user not found", 404);
    }

    if(!blogId){
        throw new ApiError("blogId is required", 400);
    }

    const blogs = await Blogs.findOne({author : user._id , _id : new mongoose.Types.ObjectId(`${blogId}`)});

    if(!blogs){
        throw new ApiError("blog not found", 404);
    }

    const templateData = template({
        authors : user.name,
        heading : blogs.heading,
        content : blogs.content
    });


    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(templateData);

    const pdf = await page.pdf();

    fs.writeFileSync(`./public/pdf/blog.pdf`,pdf);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type:"oauth2",
            accessToken:process.env.ACCESS_TOKEN,
            user: "amann5153@gmail.com",
            pass: process.env.PASSWORD,
            clientId:process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        }
    });


    const mailOptions = {
        from: "amann5153@gmail.com",
        to: "amann5153@gmail.com",
        subject: "Blog",
        html: templateData,
        attachments: [
        {
            filename: "blog.pdf",
            path: path.resolve(__dirname, `../../public/pdf/blog.pdf`),
        }
        ]
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({message : "mail sent"});
}

module.exports = {
    getPdf,
    mailPdf
}