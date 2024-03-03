import React,{useState} from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighLightText from './HighLightText'
import CourseCard from './CourseCard'
const ExploreMore = () => {
    const tabsName = [
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths"
    ]
    const [currentTab,setCurrentTab] = useState(tabsName[0])
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)
    const [courses,setCourses] = useState(HomePageExplore[0].courses)

    function setMyCards(value){
        setCurrentTab(value)
        const result = HomePageExplore.filter((course)=>course.tag===value)
        setCurrentCard(result[0].courses[0].heading)
        setCourses(result[0].courses)
    }
  return (
    <div>
        {/* Explore More  */}
            <div className='flex flex-col text-white items-center text-4xl font-semibold my-10'>
                <p>Unlock the <HighLightText text={"Power of Code"}/></p>
                <p className=' text-richblack-300 text-lg font-semibold mt-2'>Learn to Build Anything You Can Imagine</p>
            </div>
        {/* Tabs Section  */}
        <div className='lg:flex hidden rounded-full bg-richblack-800 text-richblack-200 -mt-5 mx-auto w-max font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] '>
            {
                tabsName.map((tab,index)=>{
                    return (
                        <div className={`flex items-center gap-2 text-[16px] 
                        ${currentTab === tab ?"bg-richblack-900 text-richblack-5 font-medium":"text-richblack-200"} px-7 py-[7px] rounded-full transition-all duration-200 hover:bg-richblack-900 hover:text-richblack-5 cursor-pointer`}
                        key={index}
                        onClick={()=>setMyCards(tab)}>
                            {tab}
                        </div>
                    )
                })
            }
        </div>
        <div className='lg:block hidden lg:h-[200px] '></div>
        <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
            {
                courses.map((course,index)=>{
                    return (
                        <CourseCard 
                        key={index}
                        cardData={course}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                        />
                    )
                })
            }
        </div> 
    </div>
  )
}

export default ExploreMore