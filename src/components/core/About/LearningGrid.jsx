import React from 'react'
import HighLightText from '../HomePage/HighLightText'
import CTAButton from '../HomePage/CTAButton'
const LearningGridArray = [
    {
        order:-1,
        heading:"World class learning for",
        highlightText:"Anyone, Anywhere",
        description:"StudyX partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText:"Learn more",
        BtnLink:"/"
    },
    {
        order:1,
        heading:"Curriculum Based on Industry Needs",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order:2,
        heading:"Our Learning Methods",
        description:"StudyX partners with more than 275+ leading universities and companies to bring.",
    },
    {
        order:3,
        heading:"Certification",
        description:"StudyX partners with more than 275+ leading universities and companies to bring.",
    },
    {
        order:4,
        heading:'Rating "Auto-grading"',
        description:"StudyX partners with more than 275+ leading universities and companies to bring.",
    },
    {
        order:5,
        heading:"Ready to Work",
        description:"StudyX partners with more than 275+ leading universities and companies to bring.",
    },

]
const LearningGrid = () => {
  return (
    <div className='grid mx-auto w-[350px] lg:w-fit grid-cols-1 lg:grid-cols-4 mb-12'>
        {
            LearningGridArray.map((card,index)=>(
                <div key={index} className={`${index===0 &&"lg:col-span-2 lg:h-[294px]"}
                ${card.order % 2 === 1 ? "bg-richblack-700 lg:h-[294px]":"bg-richblack-800 lg:h-[294px]"}
                ${card.order === 3 && "lg:col-start-2"}
                ${card.order < 0 && "bg-transparent"} `}>
                    {
                        card.order < 0 ? (
                            <div className='lg:w-[90%] flex flex-col gap-3 pb-10 lg:pb-0'>
                                <div className='text-4xl font-semibold '>
                                    {card.heading}
                                    <HighLightText text={card.highlightText}/>
                                </div>
                                <p className='text-richblack-300 font-medium'>{card.description}</p>
                                <div className='w-fit mt-4'>
                                    <CTAButton active={true} linkto={card.BtnLink}>{card.BtnText}</CTAButton>
                                </div>
                            </div>
                        ):(
                            <div className='p-8 flex flex-col gap-8'>
                                <h1 className='text-richblack-5 text-lg'>{card.heading}</h1>
                                <p className='text-richblack-300 font-medium'>{card.description}</p>
                            </div>
                        )
                    }
                </div>
            ))
        }
    </div>
  )
}

export default LearningGrid