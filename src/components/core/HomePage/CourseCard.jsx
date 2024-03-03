import React from 'react'
import {HiUsers} from "react-icons/hi"
import { ImTree } from "react-icons/im";
const CourseCard = ({cardData,currentCard,setCurrentCard}) => {
  return (
    <div className={`w-[360px] lg:w-[30%] 
    ${currentCard===cardData?.heading? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50":"bg-richblack-800"} text-richblack-25 h-[300px] box-border cursor-pointer`}
    onClick={()=>setCurrentCard(cardData?.heading)}>
    <div className='flex flex-col h-[80%] border-b-[2px] border-dashed p-6 gap-3 border-richblack-400 gap-3'>
      <div className={`${
        currentCard===cardData?.heading && "text-richblack-800"
      } font-semibold text-[20px]`}>
        {cardData?.heading}
      </div>
      <div className='text-richblack-400'>{cardData?.description}</div>
    </div>
    <div className={`flex flex-row justify-between ${
      currentCard===cardData?.heading?"text-blue-300":"text-richblack-300"
    } px-6 py-3 font-medium`}>
      {/* Level  */}
      <div className='flex flex-row items-center text-[16px] gap-2'>
        <HiUsers/>
        <p>{cardData?.level}</p>
      </div>
      <div className='flex flex-row items-center text-[16px] gap-2'>
        <ImTree/>
        <p>{cardData?.lessionNumber} Lession</p>
      </div>
    </div>
    </div>
  )
}

export default CourseCard