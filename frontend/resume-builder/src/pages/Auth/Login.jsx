import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Login = ({setCurrentPage}) => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(null);


  const navigate=useNavigate();
  const {updateUser}=useContext(UserContext);


  const handleLogin=async(e)=>{
     e.preventDefault();

     if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
     }

     if(!password){
      setError("Please enter a password");
      return;
     }

     setError("")

    //  Login api call
    try {
      const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password
      });
      const {token}=response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if(error.response&& error.response.data.message){
          setError(error.response.data.message);
      }
      else{
        setError("Something went wrong.Please try again")
      }
    }
  };

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg text-black font-semibold'>Welcome back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to log in</p>

      <form onSubmit={handleLogin}>
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
        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button 
          type='submit'
          className='btn-primary'
          >
            LOGIN
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account? {" "}
          </p>
          <button
          type='button'
            className='font-medium text-primary underline cursor-pointer'
            onClick={()=>{
              setCurrentPage("signup");
            }}
            >
              SignUp
            </button>
      </form>
    </div>
  )
}

export default Login