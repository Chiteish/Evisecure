const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected!");
        console.log(conn.connection.host);

    } catch (err) {
        console.log("============= FULL ERROR =============");
        console.error(err);
        console.log("======================================");
        process.exit(1);
    }
};

module.exports = connectDB;