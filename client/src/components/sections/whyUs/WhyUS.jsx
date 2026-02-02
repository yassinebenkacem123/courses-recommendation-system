import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
const WhyUS = () => {
   
  return (
    <section className='min-h-screen mt-20 items-center py-10 flex flex-col  gap-7'>
       <div className='w-full flex items-center justify-center'>
         <button className='px-2 font-medium w-50 py-2 text-lg border border-gray-400 rounded-full'>
            Why US ?
        </button>
       </div>
        
        <div className='flex flex-col items-center gap-4'>
        <h1 className='text-6xl text-center font-medium '>
            Build  to Help Your Learn Better, faster, smarter        
        </h1>
        <p className='text-wrap  text-center mt-3 text-gray-500/80 font-thin text-xl w-[80%]'>
            We don't just teach, we ampower with industry relevent content, personalized guidance, and the tools to tum learning into action.
        </p>
       </div>
       
        <div className='flex h-full items-start gap-5 '>
            <div className='flex  h-full flex-col gap-5 w-[33%]'>
                <div className='bg-blue-950 h-[60%] p-4 flex items-baseline flex-col gap-10 rounded-xl'>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-white   text-5xl font-medium'>
                            We Have More Than 5K+ Courses.
                        </h1>
                        <p className='text-gray-100 text-lg'>
                            Join growing global community of learners and access a vast library of courses across diverse fields.
                        </p>
                    </div>
                    <button className="main-bg-color w-[50%]  font-medium text-lg text-black rounded-full px-7 py-4">
                        Browse Courses  <FaArrowRight className='inline ml-2'/>
                    </button>
                </div>

                <div className='flex h-65 flex-col gap-10 rounded-2xl p-4 bg-blue-900 text-white'>
                    <h1 className='text-white   text-3xl font-medium'>
                        We Have More Than 200+ Top Mentors & Coaches
                    </h1>
                </div>
            </div>
            <div className='bg-gray-400/15 h-full w-[33%] rounded-2xl p-5 flex flex-col gap-10'>
                <div className='bg-white flex justify-between px-5 py-15 relative rounded-2xl p-4'>
                    <img 
                        className='w-20 relative bottom-10 h-20'
                        src="/icons/google.png" alt="" />
                    <img 
                        className='w-20 relative top-10 h-20'
                        src="/icons/facebook.png" alt="" />
                    <img 
                        className='w-20 relative bottom-4 h-20'
                        src="/icons/linkedin.png" alt="" />

                    <img 
                        className='w-20 relative top-13 h-20'
                        src="/icons/uni.png" alt="" />
               
                </div>
                <div className='flex flex-col gap-10'>
                    <h1 className='text-4xl font-medium text-black'>
                        Collaborated with more than 100+ Top Companies
                    </h1>
                    <p className='text-lg text-gray-400 font-thin'>
                        Form universties to industry leaders, our partnerships ensure our courses are aligned with real-world needs,
                        providing you with relevant skills and opportunities,
                        
                    </p> 
                </div> 
                 
            <button className='bg-white py-4 w-[40%] text-black font-medium text-lg rounded-full'> 
                        Read more  <FaArrowRight className='inline ml-2'/>
                    </button>


            </div>

            
            <div className='p-5 flex flex-col gap-15 w-[33%] rounded-2xl bg-gray-400/14'>
                <h1>Our Growth</h1>
                <div className='flex flex-col gap-20'>
                    <div className='flex flex-col gap-5'>
                        <p className='text-lg text-gray-400 font-thin'>
                            Our company growth each year
                        </p>
                        <h1
                            className='text-7xl font-medium text-black'
                        >70%</h1>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <p
                            className='text-lg text-gray-400 font-thin'
                        >Each Year Our course enrollment grows significantly</p>
                        <h1 className='text-7xl font-medium text-black'>450%</h1>
                    </div>
                    <button className='bg-white py-4 w-[40%] text-black font-medium text-lg rounded-full'> 
                        Read more  <FaArrowRight className='inline ml-2'/>
                    </button>

                </div>
            </div>
          
        </div> 
    </section>
  )
}

export default WhyUS