require('dotenv').config();
const connectToDB = require('./db/db');
const {PORT} = require('./constant');
const {app, server} = require('./socket/socket');

const express = require("express");
const cors = require('cors');
const errorHandler = require('./middleware/ErrorHandler.middleware');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRouter = require('./routes/auth.routes');
const blogRouter = require('./routes/blog.routes.js');
const commentRouter = require('./routes/comment.routes');
const testRouter = require('./routes/test.routes');
const likeRouter = require('./routes/like.routes');
const saveRouter = require('./routes/save.routes');
const followerRouter = require('./routes/subscriber.routes.js');
const viewsRouter = require('./routes/views.routes.js');
const analyticsRouter = require('./routes/analytics.routes.js');
const profileRouter = require('./routes/profile.routes.js');

const corsOptions = {
    origin: "http://localhost:3000", 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    allowedHeaders: 'Content-Type,Authorization', 
    AccessControlAllowCredentials: true,
    credentials: true, 

    headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": true
    }
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set("view engine", "handlebars");
app.set("views", "./views");


app.use("/public/profile", express.static(path.join(__dirname, "../public/profile")));
app.use(`/public/blog/:userId`, (req, res, next)=>{
    const userId = req.params.userId;
    express.static(path.join(__dirname, `../public/blog/${userId}`))(req, res, next);
});

app.use(`/public/coverImage/:userId`, (req, res, next)=>{
    const userId = req.params.userId;
    express.static(path.join(__dirname, `../public/coverImage/${userId}`))(req, res, next);
});

app.use('/api/v1/auth', authRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/test", testRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/save", saveRouter);
app.use("/api/v1/subscribe", followerRouter);
app.use("/api/v1/views", viewsRouter);
app.use("/api/v1/analytics", analyticsRouter);
app.use("/api/v1/profile", profileRouter);

app.use(errorHandler);


connectToDB().then(()=>{
    server.listen(PORT, ()=>{
        console.log(`server is running on port ${PORT}`);
    })
}).catch((e)=>{
    console.log("error in connection", e);
})
