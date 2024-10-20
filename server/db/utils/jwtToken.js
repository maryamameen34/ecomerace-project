const sendToken = (user, statusCode, res) => {
    const token = user.generateJWT();

    // Options for cookies
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // Set expiration to 90 days
        httpOnly: true
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        user,
    });
};

module.exports = sendToken;
