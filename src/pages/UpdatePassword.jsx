import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {AiFillEyeInvisible,AiFillEye,AiOutlineArrowLeft} from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI'
const UpdatePassword = () => {
    const [formData,setFormData] = useState({
        password:"",
        confirmPassword:"",
    })
    const navigate = useNavigate()
    const location = useLocation();
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const {loading} = useSelector((state)=>state.auth)
    const handleOnChange = (e)=>{
        setFormData((prev)=>(
            {
                ...prev,
                [e.target.name]:e.target.value,
            }
        ))
    }
    const dispatch = useDispatch();
    const handleOnSubmit = (e)=>{
        console.log("submitting form data")
        e.preventDefault();
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(formData.password,formData.confirmPassword,token,navigate))
    }
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        {
            loading?(
                <div className='spinner'></div>
            ):(
                <div className='max-w-[500px] p-4 lg:p-8'>
                    <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>Choose Password</h1>
                    <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>Almost done. Enter your new password and your all set.</p>
                    <form onSubmit={handleOnSubmit}>
                        <label className='relative'>
                            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>New Password<sup className='text-pink-200'>*</sup></p>
                            <input style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                      }}
                                      className=" rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 form-style w-full" type={`${showPassword?"text":"password"}`} 
                            required 
                            name="password"
                            placeholder='Password'
                            onChange={handleOnChange}/>
                            
                                <span className='absolute right-3 top-[38px] z-[10] cursor-pointer' onClick={()=>setShowPassword((prev)=>!prev)}>{
                                    showPassword ? <AiFillEyeInvisible fill="#AFB2BF" fontSize={24}/> : <AiFillEye fontSize={24}/>}
                                </span>
                            
                        </label>
                        <label className='relative mt-3 block'>
                            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Confirm Password<sup className='text-pink-200'>*</sup></p>
                            <input style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                      }}
                                      className=" rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 form-style w-full" type={`${showConfirmPassword?"text":"password"}`} 
                            required 
                            name="confirmPassword"
                            onChange={handleOnChange}
                            placeholder='Confirm Password'/>
                            
                                <span className="absolute right-3 top-[38px] z-[10] cursor-pointer" onClick={()=>setShowConfirmPassword((prev)=>!prev)}>{
                                    showConfirmPassword ? <AiFillEyeInvisible fontSize={24}/> : <AiFillEye fontSize={24}/>}
                                </span>
                        </label>
                        <button className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'>
                            Reset Password
                        </button>
                    </form>
                            <div className='mt-6 flex items-center justify-between'>
                            <Link to="/login" className='mt-6 flex items-center'>
                            <AiOutlineArrowLeft/>
                            <p className='ml-3'>Back To Login</p>
                            </Link>
                            </div>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword