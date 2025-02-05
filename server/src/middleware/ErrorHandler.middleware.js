

const errorHandler = (err, req, res, next)=>{
    console.log("err : ",err);
    if(err.statusCode >=400 && err.statusCode < 500){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            data : err.data ?? undefined
        })
    }
    else{
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data : err.data ?? undefined
        })
    }
}

module.exports = errorHandler;