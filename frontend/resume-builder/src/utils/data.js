import TEMPLATE_ONE_IMG from "../assets/template-one.png";
import TEMPLATE_TWO_IMG from "../assets/template-two.png";
import TEMPLATE_THREE_IMG from "../assets/template-three.png";

export const resumeTemplates=[
    {
        id:'01',
        thumbnailImg:TEMPLATE_ONE_IMG,
        colorPaletteCode:'themeOne'
    },
    {
        id:'02',
        thumbnailImg:TEMPLATE_TWO_IMG,
        colorPaletteCode:'themeTwo'
    },
    {
        id:'03',
        thumbnailImg:TEMPLATE_THREE_IMG,
        colorPaletteCode:'themeThree'
    },

]

export const themeColorPalette={
    themeOne:[
        ["#EBFDFF","#A1F4FD","#CEFAFE","#00B8DB","#4A5565"],
        ["#E9FBF8","#B4EFE7","#93E2DA","#2AC9A0","#3D4C5A"],
        ["#F5F4FF","#E0DBFF","#C9C2F8","#8579D1","#4B4B5C"],
        ["#F0FAFF","#E0DBFF","#AFDEFF","#3399FF","#445361"],
        ["#FFF5F7","#FFE0EC","#FAC6D4","#F6729C","#5A5A5A"],
        ["#F9FAFB","#E4E7EB","#CBD5E0","#7F9CF5","#2D3748"],

        ["#F4FFFD","#D3FDF2","#B0E9D4","#34C79D","#384C48"],
        ["#FFF7F0","#FFE6D9","#FFD2BA","#FF9561","#4C4743"],
        ["#F9FCFF","#E3F0F9","#C0DDEE","#6CA6CF","#46545E"],
        ["#FFFDF6","#FFF4D7","#FFE7A0","#FFD000","#57534E"],
        ["#EFFCFF","#CBF0FF","#99E0FF","#007BA7","#2B3A42"],

        ["#F7F7F7","#E4E4E4","#CFCFCF","#4A4A4A","#222222"],
        ["#E3F2FD","#90CAF9","#a8d2f4","#1E88E5","#0D47A1"],

    ],
};

export const DUMMY_RESUME_DATA={
    profileInfo:{
        profileImg:null,
        previewUrl:"",
        fullName:"Sugithan P",
        designation:"Junior Web Developer",
        summary:"Passionate and results-driven developer with a fresher"
    },
    contactInfo:{
        email:"sugithan789@gmail.com",
        phone:"9876543210",
        loaction:"#10 Anywhere,Any city,Any Country",
        linkedin:"https://linkedin.com/Sugithan7/",
        github:"https://github.com/SugithanPalanivel",
        website:"https://linkedin.com/Sugithan7/",
    },
    workExperience:[
        {
            company:"Coding Dev",
            role:"Full Stcak Developer",
            startDate:"2025-01",
            endDate:"2025-12",
            description:"Worked on cross-funtional teams developimg full stack solution with React,Node.js,Express,MongoDB and Tailwindcss"
        },
        {
            company:"Startup Company",
            role:"Iunior WEb Developer",
            startDate:"2024-01",
            endDate:"2024-12",
            description:"Worked on cross-funtional teams developimg full stack solution with React,Node.js,Express,MongoDB and Tailwindcss"
        },
    ],
    education:[
        {
            degree:"B.TECH- IT",
            institution:"Anna University",
            startDate:"2022-11",
            endDate:"2026-06",
        },
    ],
    skills:[
        {name:"JavaScript",progress:95},
        {name:"React",progress:100},
        {name:"Node.js",progress:90},
        {name:"MongoDB",progress:80},
        {name:"Tailwindcss",progress:75},
    ],
    projects:[
        {
            title:"Expanse Tracker",
            description:"app buit with MERN Stack",
            github:"https://github.com/SugithanPalanivel/expanse-tracker"
        },
        {
            title:"INTERVIEW PREP WITH AI",
            description:"app buit with MERN Stack with geminiAI",
            github:"https://github.com/SugithanPalanivel/interview-prep-ai"
        }
    ],
    certificatons:[
        {
            title:"Basics of python and Java",
            issuer:"Udemy",
            year:"2025"
        },
        {
            title:"Full Stack Web Developer",
            issuer:"Novitech.Ltd",
            year:"2025"
        }
    ],
    languages:[
        {name:"English",progress:80},
        {name:"Tamil",progress:100},
    ],
    interests:["Reading","Coding"],
};