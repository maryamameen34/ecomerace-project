const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const morgan = require("morgan");
const appRoutes = require("./routes");
const connectDataBase = require("./db/dbconnect");
const ErrorHandler = require("./utils/ErrorHandler");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config({ path: "./.env" });
app.use(express.json());
app.use(cookieParser());

// Serve static files from the "uploads" directory under "/uploads" route
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));
app.use(cors({
  origin: "https://ecomerace-project-i8zh.vercel.app",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

mongoose.connect(process.env.MONGODB_CLOUD, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 5000;
app.use("/api", appRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    const error = new ErrorHandler(err.message || 'Something went wrong', err.statusCode || 500);
    res.status(error.statusCode).json({
      message: error.message,
    });
});

// Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for handling unexpected exception`);
});

// Connect to database
connectDataBase();

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
