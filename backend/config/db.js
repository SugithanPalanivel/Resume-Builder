const mongoose=require("mongoose");

const ConnectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{});
        console.log("MongoDB connected");
    } catch (err) {
        console.error("Error connecting to MongoDb",err);
        process.exit(1);
    }
};



module.exports=ConnectDB;