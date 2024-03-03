import React from 'react'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
import "../../../App.css"
const CodeBlocks = ({heading,position,subheading,btn1,btn2,codeblock,codeColor,backgroudGradient}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
        <div className='w-[100%] lg:w-[50%] flex flex-col gap-8'>
            {heading}
            <div className='text-richblack-300 font-bold'>
                {subheading}
            </div>
            <div className='flex flex-row gap-7 mt-7'>
                <CTAButton 
                 active={btn1.active} linkto={btn1.linkto}>
                    <div className='flex items-center gap-2'>
                        {btn1.text}
                        <FaArrowRight/>
                    </div>
                 </CTAButton>
                 <CTAButton active={btn2.active} linkto={btn2.linkto}>
                    {btn2.text}
                 </CTAButton>
            </div>
        </div>
        <div className='h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]'>
            <div className={`absolute ${backgroudGradient}`}></div>
            <div className='flex flex-col font-bold font-inter  w-[10%] text-richblack-400 text-center'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`w-[90%]  font-mono flex flex-col gap-2 pr-2 ${codeColor}`}>
                <TypeAnimation
                sequence={[codeblock,2000,""]}
                repeat={Infinity}
                cursor={true}
                style = {
                    {
                        whiteSpace: "pre-line",
                        display:"block",
                    }
                }
                omitDeletionAnimation={true}
                />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks