const MAX_ATTEMPTS = 5;
const TTL = 15*60;

const AttemptsRemaining = async (key) =>{
    
    try {
        const attempts = await req.redisClient.get(key);
        const ttl = await req.rediClient.ttl(key);
    
        const attemptCount = parseInt(attempts);
        const isBlocked = attemptCount >= MAX_ATTEMPTS;
    
        return {
            attemptCount,
            attemptsRemaining: MAX_ATTEMPTS - attemptCount,
            isBlocked,
            ttl,
            resetTime: isBlocked ? ttl : 0
        };
    } catch (error) {
        
    }
}


const increaseLoginAttempts = async(key) => {
    try{

    }
    catch(err){
        
    }
}
