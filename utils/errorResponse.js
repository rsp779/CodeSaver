class ErrorResponse extends Error {
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode
    }
}

module.exports=ErrorResponse;


//This is the blue print of our error handlers 
