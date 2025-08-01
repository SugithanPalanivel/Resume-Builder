const express=require("express");
const {registerUser,getUserProfile,loginUser}=require("../Controllers/authController");
const {protect}=require("../middleware/authMiddleware");
const upload=require("../middleware/uploadMiddleware");

const router=express.Router(); 

// Auth Routes
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",protect,getUserProfile);

// router.post("/upload-image",upload.single("image"),(req,res)=>{
//     if(!req.file){
//         return res.status(400).json({message:"no file uploaded"});

//     }
//     const imageUrl=`${req.protocol}://${req.get("host")}/uploads/${
//         req.file.filename
//     }`;
//     res.status(200).json({imageUrl});
// })


router.post("/upload-image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      console.error("Upload failed: no file received");
      return res.status(400).json({ message: "No file uploaded" });
    }

    

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    return res.status(200).json({ imageUrl });

  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ message: "Upload failed" });
  }
});

module.exports=router;

