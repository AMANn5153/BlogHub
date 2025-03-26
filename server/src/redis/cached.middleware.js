const redis = require("redis");

let redisClient;
const connectToRedis = async(req, res, next) => {
    try {
        redisClient = redis.createClient(
            {
                url: process.env.REDIS_HOST,
            }
        );
    
        redisClient.on("error", (err)=>{
            console.log(err);
        });
    
        await redisClient.connect();
        console.log("redis connected");
    } catch (error) {
        console.log("error in redis connection", error);
    }
}

const getRedisClient = () => {
    return redisClient;
}



module.exports = {connectToRedis, getRedisClient};