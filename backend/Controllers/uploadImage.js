// const fs=require("fs");
// const path=require("path");
// const Resume=require("../models/Resume");
// const upload=require("../middleware/uploadMiddleware");

// const uploadResumeImages=async(req,res)=>{
//     try {
//         upload.fields([{name:'thumbnail'},{name:'profileImage'}])(req,res,async(err)=>{
//             if(err){
//                 return res.status(400).json({message:"File upload failed",error:err.message})
//             }
//             const resumeId=req.params.id;
//             const resume=await Resume.findOne({_id:resumeId,userId:req.user._id});
//             if(!resume){
//                 return res.status(404).json({message:"Resume not found or unauthorized"})
//             }
//             const uploadsFolder=path.join(__dirname,'..','uploads');
//             const baseUrl=`${req.protocol}://${req.get("host")}`;

//             const newThumbnail=req.files.thumbnail?.[0];
//             const newProfileImage=req.files.profileImage?.[0];
            

//             // If new thumbnail uploaded,delete old one

//             if(newThumbnail){
//                 if(resume.thumblineLink){
//                     const oldThumbnail=path.join(uploadsFolder,path.basename(resume.thumblineLink));
//                     if(fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
//                 }
//                 resume.thumblineLink=`${baseUrl}/uploads/${newThumbnail.filename}`;
//             }
            
//             // If new profile image uploaded,delete old one

//             if(newProfileImage){
//                 if(resume.profileInfo?.profilePreviewUrl){
//                     const oldProfile=path.join(uploadsFolder,path.basename(resume.profileInfo.profilePreviewUrl));
//                     if(fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
//                 }
//                 resume.profileInfo.profilePreviewUrl=`${baseUrl}/uploads/${newProfileImage.filename}`;
//             }
//             await resume.save();

//             res.status(200).json({
//                 message:"Images uploaded successfully",
//                 thumbnailLink:resume.thumblineLink,
//                 profilePreviewUrl:resume.profileInfo.profilePreviewUrl
//             })
//         });

//     } catch (error) {
//         console.error("Error uploading images:",err);
//         req.status(500).json({message:"Failed to upload thumbnail and profileimage",error:error.message })
//     }
// }

// module.exports={uploadResumeImages};

const fs = require("fs");
const path = require("path");
const Resume = require("../models/Resume");
const upload = require("../middleware/uploadMiddleware");

const uploadResumeImages = async (req, res) => {
  try {
    upload.fields([{ name: "thumbnail" }, { name: "profileImage" }])(req, res, async (err) => {
      if (err) {
        console.error("Multer Error:", err);
        return res.status(400).json({ message: "File upload failed", error: err.message });
      }

    //   console.log("Files received:", req.files);
    //   console.log("Request body:", req.body);

      const resumeId = req.params.id;
      const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

      if (!resume) {
        return res.status(404).json({ message: "Resume not found or unauthorized" });
      }

      const uploadsFolder = path.join(__dirname, "..", "uploads");
      const baseUrl = `${req.protocol}://${req.get("host")}`;

      const newThumbnail = req.files?.thumbnail?.[0];
      const newProfileImage = req.files?.profileImage?.[0];

      if (!newThumbnail && !newProfileImage) {
        return res.status(400).json({ message: "No files uploaded. Expected 'thumbnail' or 'profileImage'." });
      }

      // 🔁 Handle Thumbnail
      if (newThumbnail) {
        if (resume.thumblineLink) {
          const oldThumbnailPath = path.join(uploadsFolder, path.basename(resume.thumblineLink));
          if (fs.existsSync(oldThumbnailPath)) fs.unlinkSync(oldThumbnailPath);
        }
        resume.thumblineLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
      }

      // 🔁 Handle Profile Image
      if (newProfileImage) {
        if (resume.profileInfo?.profilePreviewUrl) {
          const oldProfilePath = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
          if (fs.existsSync(oldProfilePath)) fs.unlinkSync(oldProfilePath);
        }
        resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
      }

      await resume.save();

      res.status(200).json({
        message: "Images uploaded successfully",
        thumbnailLink: resume.thumblineLink,
        profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
      });
    });
  } catch (error) {
    console.error("Server error while uploading resume images:", error);
    res.status(500).json({
      message: "Internal server error while uploading images",
      error: error.message,
    });
  }
};

module.exports = { uploadResumeImages };
