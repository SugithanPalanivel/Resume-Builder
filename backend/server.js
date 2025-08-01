require("dotenv").config();
const express=require("express");
const path=require("path");
const cors=require("cors");
const connectDB=require("./config/db");
const authRoutes=require("./routes/authRoutes");
const resumeRoutes=require("./routes/resumeRoutes");


const app=express();

app.use(
    cors({
        origin:process.env.CLIENT_URL || "*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"]
    })
);

connectDB();

// mioddleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));


// Routes
app.use("/api/auth",authRoutes);
app.use("/api/resume",resumeRoutes);

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`))
