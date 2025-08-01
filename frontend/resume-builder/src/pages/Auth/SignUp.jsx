import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = ({setCurrentPage}) => {

  const [profilePic,setProfilePic]=useState(null);
  const [fullName,setFullName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(null);


  const navigate=useNavigate();
  const {updateUser}=useContext(UserContext);

  const handleSignUp=async(e)=>{
    e.preventDefault();

    let profileImageUrl="";

    if(!fullName){
      setError(" Please enter a fullName");
      return;

    }
    if(!validateEmail(email)){
      setError(" Please Enter a valid Email Address");
      return;
    }
    if(!password){
      setError("Please enter a password");
      return;
    }

    setError("");

    // Signup api call
      try {


        // upload image if present
        // if(profilePic){
        //   const imgUploadRes=await uploadImage(profilePic);
        //   profileImageUrl=imgUploadRes.imageUrl || "";
        // }


        let profileImageUrl = "";
        if (profilePic) {
           try {
            const imgUploadRes = await uploadImage(profilePic);
            profileImageUrl = imgUploadRes?.imageUrl || "";
           } catch (uploadErr) {
               setError("Image upload failed.");
                return;
              }
          }

        const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
          name:fullName,
          email,
          password,
          profileImageUrl
        });
        const {token}=response.data;
        if(token){
          localStorage.setItem("token",token);
          updateUser(response.data);
          navigate("/dashboard");
        }

      } catch (error) {
        if(error.response && error.response.data.message){
          setError(error.response.data.message)
        }
        else{
          setError("Something went wrong.Please try again .")
        }
      }


  }
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-between'>
      <h3 className='text-lg font-semibold text-black'>
        Create an Account
      </h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        join us today by entering your details
      </p>

      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
        <div className='grid grid-cols-1 md:grid-cols-1 gap-2'>
        <Input
          value={fullName}
          onChange={({target})=>setFullName(target.value)}
          placeholder="FullName"
          label="FullName"
          type="text"
        />
         <Input
        value={email}
        onChange={({target})=>setEmail(target.value)}
        placeholder="johnexample.com"
        label="Email address"
        type="text"
        
        />
        <Input
        value={password}
        onChange={({target})=>setPassword(target.value)}
        placeholder="Atleast 8 characters"
        label="password"
        type="password"
        
        />
        </div>
        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button 
          type='submit'
          className='btn-primary'
          >
            SIGNUP
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already  an account? {" "}
          </p>
          <button
          type='button'
            className='font-medium text-primary underline cursor-pointer'
            onClick={()=>{
              setCurrentPage("login");
            }}
            >
             Login
            </button>
      </form>
    </div>
  )
}

export default SignUp