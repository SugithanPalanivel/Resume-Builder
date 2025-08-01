const express=require("express");
const {
    createResume,
    updateResume,
    deleteResume,
    getResumeById,
    getUserResume
} =require("../Controllers/resumeController");
const {protect}=require('../middleware/authMiddleware');
const {uploadResumeImages}=require("../Controllers/uploadImage")

const router=express.Router();


router.post("/",protect,createResume);
router.get("/",protect,getUserResume);
router.get("/:id",protect,getResumeById);
router.put("/:id",protect,updateResume);
router.put("/:id/upload-images",protect,uploadResumeImages);
router.delete("/:id",protect,deleteResume);




module.exports=router;







module.exports=router;