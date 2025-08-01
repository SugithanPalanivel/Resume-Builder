const fs=require("node:fs");
const path=require("node:path");
const Resume =require("../models/Resume");


// @desc create a new resume
// @route POST /api/resume
// @access private
const createResume=async(req,res)=>{
    try {
        const {title}=req.body;

        // Default template

        const defaultResumeData={
            profileInfo:{
                profileImg:null,
                previewUrl:"",
                fullName:"",
                designation:"",
                summary:""
            },
            contactInfo:{
                email:"",
                phone:"",
                location:"",
                linkedIn:"",
                github:"",
                website:""
            },
            workExperience:[
                {
                     company:"",
                     role:"",
                     startDate:"",
                     endDate:"",
                     description:""
                }
            ],
            education:[
                {
                    degree:"",
                    institution:"",
                    startDate:"",
                    endDate:""
                }
            ],
            skills:[
                {
                    name:"",
                    progress:0
                }
            ],
            projects:[
                {
                    title:"",
                    description:"",
                    github:"",
                    liveDemo:""
                }
            ],
            ceritifications:[
                {
                    title:"",
                    issuer:"",
                    year:""
                }
            ],
            languages:[
                {
                    name:"",
                    progress:0
                }
            ],
            interests:[""]
        };


        const newResume=await Resume.create({
            userId:req.user._id,
            title,
            ...defaultResumeData
        });

        res.status(201).json(newResume);
    } catch (error) {
        res.status(500).json({message:"Failed to create resume",error:error.message})
    }
};


const getUserResume=async(req,res)=>{
   try {
        
        const resumes=await Resume.find({userId:req.user._id}).sort({
            updatedAt:-1
        });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({message:"Failed to get User Resume resume",error:error.message})
    } 
};

const getResumeById=async(req,res)=>{
    try {
        const resume=await Resume.findOne({_id:req.params.id,userId:req.user._id});

        if(!resume){
            return res.status(404).json({message:"Resume not found"});
        }

        res.json(resume);
    } catch (error) {
        res.status(500).json({message:"Failed to getResumeById resume",error:error.message})
    }
};


const updateResume=async(req,res)=>{
    try {
        const resume=await Resume.findOne({_id:req.params.id,userId:req.user._id});

        if(!resume){
            return res.status(404).json({message:"Resume not found"});
        }

        // merge updates from req.body into existing resume

        Object.assign(resume,req.body);


        const savedResume=await resume.save();

        res.json(savedResume);
    } catch (error) {
        res.status(500).json({message:"Failed to update resume",error:error.message})
    }
};



const deleteResume=async(req,res)=>{
    try {
        const resume=await Resume.findOne({_id:req.params.id,userId:req.user._id});

        if(!resume){
            return res.status(404).json({message:"Resume not found"});
        }

        // Delete thumblinelink and profileImageUrl images from uploads folder
        const uploadsFolder=path.join(__dirname,'..','uploads');
        const baseUrl=`${req.protocol}://${req.get("host")}`;

        if(resume.thumblineLink){
            const oldthumbnail=path.join(uploadsFolder,path.basename(resume.thumblineLink));
            if(fs.existsSync(oldthumbnail)) fs.unlinkSync(oldthumbnail);
        }


        if(resume.profileInfo?.profilePreviewUrl){
            const oldProfile=path.join(uploadsFolder,path.basename(resume.profileInfo.profilePreviewUrl));
            if(fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
        }

        const deleted=await Resume.findOneAndDelete({
            _id:req.params.id,
            userId:req.user._id
        })

        if(!deleted){
            return res.status(404).json({message:"Resume not found or unauthorized"})
        }

        res.json({message:"Resume deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Failed to delete resume",error:error.message})
    }
};



module.exports={createResume,updateResume,getResumeById,getUserResume,deleteResume}