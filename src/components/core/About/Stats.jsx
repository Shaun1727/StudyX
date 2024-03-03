import React from 'react'

const stats = [
    {count:"5K",label:"Active students"},
    {count:"10+",label:"Active students"},
    {count:"200",label:"Mentors"},
    {count:"50+",label:"Awards"}
]
const Stats = () => {
  return (
    <section className='bg-richblack-700'>
        <div className='flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto '>
            <div className='grid grid-cols-2 md:grid-cols-4 text-center'>
                {
                stats.map((item,index)=>(
                    <div  className="flex flex-col py-10" key={index}>
                        <h1 className='text-[30px] font-bold text-richblack-5'>{item.count}</h1>
                        <h1 className='font-semibold text-[16px] text-richblack-500'>{item.label}</h1>
                    </div>
                ))
                }
            </div>
        </div>
    </section>
  )
}

export default Stats