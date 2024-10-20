const ErrorHandler = require("../utils/ErrorHandler")

module.exports = (err , req , res , next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internel server error"

    // wrong mongodb id error 
    if (err.name === "CastError") {
        const message = `Resources not found with this id... Invalid ${err.path}`
        err = new ErrorHandler(message , 400)
    }

    // Duplicate Key Error
    if (err.code === 1100) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message , 400)
    }

    // wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message =  `Your url is invalid please try again later `;
        err = new ErrorHandler(message , 400)
    }

    // jwt expired
    if (err.name === "TokenExpireError") {
        const message =  ` Your Url is expired please try again later`
        err = new ErrorHandler(message , 400)
    }

    res.status(err.statusCode).json({
        success : false ,
        message : err.message 
    })

}