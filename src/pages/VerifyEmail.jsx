import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from "react-otp-input"
import {FiRefreshCcw} from "react-icons/fi"
import { useNavigate } from 'react-router-dom'
import { signUp } from '../services/operations/authAPI'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useState } from 'react'
import { sendOtp } from '../services/operations/authAPI'
const VerifyEmail = () => {
    const [otp,setOtp] = useState("")
    const dispatch = useDispatch()
    const {loading} =useSelector((state)=>state.auth)
    const {signupData} = useSelector((state)=>state.auth)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!signupData)
        navigate("/signup")
    },[])
    const {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    } = signupData

    const handleOnSubmit = (e)=>{
        e.preventDefault();
        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate))
    }
    const mystyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0px 6px"
      };
      
  return (
    <div className='min-h-[calc(100vh-3.5rem)] grid place-items-center'>
        {
            loading?(
                <div className='spinner'></div>
            ):(
                <div className='max-w-[500px] p-4 lg:p-8'>
                    <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>Verify Email</h1>
                    <p className='text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100'>A verification code has been sent to you.Please enter the code below.</p>
                    <form onSubmit={handleOnSubmit} >
                        <div style={{mystyle}}>
                            <OTPInput 
                            value={otp}
                            numInputs={6}
                            onChange={setOtp}
                            renderSeparator={<span>-</span>}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                              }}
                            renderInput={(props) => <input {...props}
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                  }}
                                 placeholder='-' className='w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50' />}
                            ></OTPInput>
                        </div>
                        
                        <button className='w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900' type='submit'>Verify Email</button>
                    </form>
                    <div className='mt-6 flex items-center justify-between'>
                            <Link to="/login"> 
                            <p className='text-richblack-5 flex items-center gap-x-2'> <AiOutlineArrowLeft/> Back To Login</p>
                            </Link>
                            <span className='flex items-center text-blue-100 gap-x-2'>
                                <FiRefreshCcw/>
                                <button onClick={()=>dispatch(sendOtp(email,navigate))}>Resend it</button>
                            </span> 
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail