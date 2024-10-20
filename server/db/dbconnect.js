const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const connectDataBase = () => {
    mongoose.connect(process.env.MONGODB_CLOUD, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log(process.env.MONGODB_CLOUD);
        console.log(`Mongodb connected with server ${mongoose.connection.client.s.options.srvHost}`);
    }).catch((err) => {
        console.log(`Error: ${err.message}`);
    });
}

module.exports = connectDataBase;
