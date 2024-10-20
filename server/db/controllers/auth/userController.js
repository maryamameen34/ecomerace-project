const catchAsyncError = require("../../middlwares/catchAsyncError");
const User = require("../../models/User")
const fs = require("fs")
const dotenv = require("dotenv")
dotenv.config({ path: "./.env" });
const jwt = require("jsonwebtoken")
const userMail = require("../../utils/sendEmail.js")
const sendToken = require("../../utils/jwtToken.js")
const path = require("path");
const ErrorHandler = require("../../utils/ErrorHandler.js");


// Signup User
exports.preSignUp = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Error deleting files" });
                }
                res.json({ message: "File deleted successfully!" });
            });

            return next(new ErrorHandler("User already exists!", 400));
        }

        const roleProvided = email == "maryamameen3453@gmail.com" ? "admin" : "customer";

        const filename = req.file.filename;
        const fileUrl = path.join('/uploads', filename);

        const user = new User({
            first_name,
            last_name,
            email,
            password,
            role: roleProvided,
            profile_pic: fileUrl
        });

        const activationToken = createActivationToken(user);
        const activationUrl = `http://localhost:3000/activation/${activationToken}`;

        await userMail({
            email: user.email,
            subject: `Activate your account`,
            message: `Hello ${user.first_name}, please click on the link to activate your account: ${activationUrl}`
        });

        res.status(201).json({
            success: true,
            message: `Please check your email (${user.email}) to activate your account!`
        });
    } catch (error) {
        console.log(error.message);
        return next(new ErrorHandler(error.message, 500));
    }
}



// Activation Token
const createActivationToken = (user) => {
    const payload = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        password: user.password,
        profile_pic: user.profile_pic
    };

    return jwt.sign(payload, process.env.ACTIVATE_SECRET, { expiresIn: process.env.EXPIRE_TIME });
};


// Activation - Activate user by clicking the activation link
exports.activateUser = catchAsyncError(async (req, res, next) => {
    try {
        // Get the activation token from the URL parameters (not the body)
        const { activation_token } = req.params;  // Extract token from URL params

        // If the token is not provided, return an error
        if (!activation_token) {
            return next(new ErrorHandler("JWT must be provided", 400));
        }

        // Verify the token and decode it
        const decoded = jwt.verify(activation_token, process.env.ACTIVATE_SECRET);

        // If token verification fails
        if (!decoded) {
            return next(new ErrorHandler("Invalid or expired token", 401));
        }

        // Destructure the user data from the decoded token
        const { first_name, last_name, email, password, role, profile_pic } = decoded;

        // Check if the user already exists by email
        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(new ErrorHandler("User with this email already exists", 400));
        }

        // Create the user in the database
        const user = await User.create({
            first_name,
            last_name,
            email,
            password,
            role,
            profile_pic,
            isVerified: true // Mark the user as verified
        });

        // Send a success response with a token (login the user)
        sendToken(user, 201, res);

    } catch (error) {
        console.log(error.message);
        return next(new ErrorHandler(error.message, 500));  // Internal Server Error
    }
});

// login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }

        // Look for the user by email
        const user = await User.findOne({ email }).select("+password");  // "+password" ensures the password is returned

        // If user does not exist, return an error
        if (!user) {
            return res.status(400).json({ error: "User with this email does not exist" });
        }

        // Check if the entered password is correct
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        // Send the token if login is successful
        sendToken(user, 200, res);

    } catch (error) {
        console.log(error.message);
        return next(new ErrorHandler(error.message, 500)); // Handle unexpected errors
    }
});


//  load logged in user
exports.loadloggedinUser = catchAsyncError(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);


        if (!user) {
            return next(new ErrorHandler("User not loggedin", 404))
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error.message);
        return next(new ErrorHandler(error.message, 500))
    }
})


// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("User with this email does not exist", 404));
    }

    // Generate Reset Token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    const resetPasswordExpire = Date.now() + 15 * 60 * 1000; // Token valid for 15 minutes

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = resetPasswordExpire;
    await user.save({ validateBeforeSave: false });

    // Create Reset URL
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    // Send Email
    try {
        await userMail({
            email: user.email,
            subject: "Password Reset Request",
            message: `Hello ${user.first_name},\n\nPlease  <a href="${resetUrl}">Click Here</a>   to reset your password:  \n\nIf you did not request this, please ignore this email.`,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // Hash the token from params to compare with DB
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler("Invalid or expired reset token", 400));
    }

    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendToken(user, 200, res);
});


// Logout User
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.log(error.message);
        return next(new ErrorHandler(error.message, 500));
    }
});