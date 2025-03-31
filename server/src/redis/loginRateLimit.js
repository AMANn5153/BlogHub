const MAX_ATTEMPTS = 5;
const TTL = 15*60;

const AttemptsRemaining = async (req,key) =>{
    try {

        if(!key && typeof(key) !== "string"){
            throw new Error("Invalid key provided for redis");
        }

        const redisKey = `User:${key}`;

        const attempts = await req.redisClient.get(redisKey);
        const ttl = await req.redisClient.ttl(redisKey);
    
        const attemptCount = attempts ? parseInt(attempts) : 0;
        const isBlocked = attemptCount >= MAX_ATTEMPTS;
        

        return {
            attemptCount,// attempts
            attemptsRemaining: (MAX_ATTEMPTS - attemptCount),//remaining attempts
            isBlocked,// is user blocked
            ttl,// time to live
            resetTime: isBlocked ? ttl : 0 // if blocked what is resetTime
        };


    } catch (error) {
        console.error("error in attemptRemaining", error);
    }
}


const increaseLoginAttempts = async(req,key) => {
    try{
        if(!key && typeof(key) !== "string"){
            throw new Error("Invalid key provided for redis");
        }

        const redisKey = `User:${key}`;

        const attempts = await req.redisClient.incr(redisKey);

        if(attempts === 1){
            await req.redisClient.expire(redisKey, TTL);
        }

        return attempts;
    }
    catch(err){
        console.log("error in increaseLoginAttempts", err);
    }
}

const resetLoginAttempts = async(req,key) => {
    try{
        if(!key && typeof(key) !== "string"){
            throw new Error("Invalid key provided for redis");
        }

        const redisKey = `User:${key}`;

        await req.redisClient.del(redisKey);
    }
    catch(err){
        console.log("error in resetLoginAttempts", err);
    }
}

module.exports = {
    increaseLoginAttempts, 
    AttemptsRemaining,
    resetLoginAttempts,
    TTL,
    MAX_ATTEMPTS
};