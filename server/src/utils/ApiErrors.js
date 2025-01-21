class ApiError extends Error{
    constructor(message, statusCode, controllerName){
        super(message);
        this.statusCode = statusCode;
        this.controllerName = controllerName;

        if(this.stack){
            console.log(`error in ${controllerName}`,this.stack);
        }

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;