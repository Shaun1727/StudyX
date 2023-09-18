import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../services/operations/authAPI'
import {AiOutlineArrowLeft} from "react-icons/ai"
const ForgotPassword = () => {
    // console.log("hi")
    const {loading} = useSelector((state)=>state.auth)
    const [email,setEmail] = useState("")
    const [emailSent,setEmailSent] = useState(false)
    const dispatch = useDispatch();
    const handleOnSubmit = (e)=>{
        console.log("submitting form data")
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent))
    }
  return (
    <div className='text-white flex min-h-[calc(100vh-3.5rem)]  justify-center items-center '>
        <div className='flex-col max-w-[500px] p-4 lg:p-8  '>
            {
                loading?(
                    <div className='spinner'></div>
                ):(
                    <div>
                        <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                            {
                                !emailSent?"Reset your Password":"Check your Email"
                            }
                        </h1>
                        <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
                            {
                                !emailSent?"Have no fear! We will send you the instructions to reset your password.If you dont have access to your email we can try acount recovery":
                                `We have sent the reset mail to ${email}`
                            }
                        </p>
                        <form className='flex-col' onSubmit={handleOnSubmit}>
                            {
                                !emailSent &&
                                <label className="w-full">
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address <sup className='text-pink-200'>*</sup></p>
                                    <input type="email" required
                                    name="email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    placeholder='Enter your Email Address'
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                      }}
                                      className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 form-style w-full"
                                    />
                                </label>
                            }
                                        <button type="submit"
                        className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                                    {
                                        !emailSent?"Reset Password":"Resend mail"
                                    }
                            </button>
                        </form>
                        <div>
                            <Link to="/login" className='mt-6 flex items-center'>
                            <AiOutlineArrowLeft/>
                            <p className='ml-3'>Back To Login</p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
        
    </div>
  )
}

export default ForgotPassword