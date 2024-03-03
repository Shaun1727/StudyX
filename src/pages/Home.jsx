import React from 'react'
import {Link} from "react-router-dom"
import {FaArrowRight} from "react-icons/fa"
import HighLightText from '../components/core/HomePage/HighLightText'
import CTAButton from '../components/core/HomePage/CTAButton'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import Banner from "../assets/Images/banner.mp4"
import ExploreMore from '../components/core/HomePage/ExploreMore'
import TimeLineSection from '../components/core/HomePage/TimeLineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'
const Home = ()=>{
  return (
    <div>
        {/* Section 1 */}
        <div className=' relative w-11/12 max-w-maxContent mx-auto flex flex-col gap-8 items-center justify-between '>
            <Link to="/signup">
                <div className='group mt-16 p-1 rounded-full bg-richblack-800 font-bold text-richblack-200'>
                    <div className='flex items-center gap-2  px-10 py-[5px] transition-all duration-200
                    group:hover:bg-richblack-900'>
                    <p>Become an Instructor</p>
                    <FaArrowRight/>
                    </div>
                </div>
            </Link>
            <div className='text-center text-4xl text-white font-semibold mt-7'>
                Empower Your Future with 
                <HighLightText text={"Coding Skills"}/>
            </div>
            <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>
            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
            </div>
            <div className='mx-3 my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
                <video className="shadow-[20px_20px_rgba(255,255,255)]" muted autoPlay loop>
                    <source  src={Banner} type="video/mp4"/>
                </video>
            </div>
            <div>
                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl text-white font-semibold'>
                            Unlock your
                            <HighLightText text={"Coding Potential "}/>
                             with our online courses
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    btn1={
                       {
                        text:"Try it Yourself",
                        linkto:"/signup",
                        active:true,
                       }
                    }
                    btn2={
                        {
                         text:"Learn More",
                         linkto:"/login",
                         active:false,
                        }
                     }
                     codeblock={`<<!DOCTYPE html>\n<html>\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="/one">One</a><a
                     href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                     codeColor="text-yellow-25"
                     backgroudGradient={"codeblock1"}
                />
            </div>
            <div>
            <CodeBlocks
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl text-white font-semibold'>
                            Start 
                            <HighLightText text={" coding in seconds "}/>
                        </div>
                    }
                    subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    btn1={
                       {
                        text:"Continue Lesson",
                        linkto:"/login",
                        active:true,
                       }
                    }
                    btn2={
                        {
                         text:"Learn More",
                         linkto:"/signup",
                         active:false,
                        }
                     }
                     codeblock={`import React from "react";\nimport CTAButton from "./Button";
                     import TypeAnimation from "react-type";\nimport {FaRightArrow} from "react-icons/fa";\n\nconst Home = () = >{\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                     codeColor="text-white"
                     backgroudGradient={"codeblock2"}
                />
            </div>
            <ExploreMore/>
        </div>
        {/* Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                     <div className='lg:h-[150px] '></div>
                     <div className='flex gap-7 text-white mt-10'>
                     <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-3' >
                                Explore Full Catalog
                                <FaArrowRight />
                            </div>
                            
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"}>
                            <div>
                                Learn more
                            </div>
                        </CTAButton>
                     </div>
                </div>
            </div>
            <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto '>
                <div className='mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0'>
                     <div className='text-4xl font-semibold text-black lg:w-[45%]'>
                        Get the Skills you need for a <HighLightText text={"job that is in demand"}/>
                     </div>
                     <div className='flex flex-col lg:w-[40%] items-start gap-10'>
                        <div className='text-[16px]'>
                        The modern StudyX is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <CTAButton
                        active={true} linkto={"/signup"}>
                            <div>
                                Learn More
                            </div>
                        </CTAButton>
                     </div>
                </div>
                <TimeLineSection/>
                <LearningLanguageSection/>
            </div>
        </div>
        {/* Section 3 */}
        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>
        <Footer/>
    </div>
  )
}
export default Home