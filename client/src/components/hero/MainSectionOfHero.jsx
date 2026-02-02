import { FiArrowUpRight } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

const MainSectionOfHero = () => {
  return (
    <section className='w-full z-10 justify-center items-center flex flex-col gap-6'>
        <div className='text-md text-white font-sans px-5 py-2 rounded-full bg-blue-950'>
            #1E-LEARNING PLATFORM
        </div>
        <h1 className='text-8xl font-medium text-white text-center'>
            Launch Career With 
            <br/>
            Ready Online Courses
        </h1>
        <p className='text-lg text-white/80'>
            Learn from the best courses online and boost your career, </p>

        <div className='flex items-center '>
            <button className="main-bg-color font-medium text-2xl text-black rounded-full px-7 py-4">
                Enroll our courses Now
            </button>
            <button className='rounded-full main-bg-color p-5 text-black'>
                <FiArrowUpRight size={27} />
            </button>
        </div> 
       <div className="w-full flex relative items-center justify-center">  
            <img

                className="fill-white absolute invert brightness-0 top-1 left-80 z-20 w-20" 
                src="/icons/focus.png"/>
            <img

                className="fill-white absolute invert brightness-0 top-80 left-110 z-20 w-20" 
                src="/icons/charts.png"/>
            <img

                className="fill-white absolute invert brightness-0 right-110 z-20 w-20" 
                src="/icons/gears.png"/>
            <div className="flex flex-col w-[20%] gap-8">
               <div className="flex flex-col gap-4">
                    <FaQuoteLeft size={40} color="white" />
                    <p className="text-white/80 text-lg max-w-lg">
                        The courses offered here have transformed my career.
                        The instructors are knowledgeable and the content is top-notch.
                        Highly recommended
                    </p>
               </div>
                <div className="flex-col flex gap-3">
                    <h4 className="text-white text-3xl font-medium">
                        5000+
                    </h4>
                    <p className="text-white text-3xl font-medium">
                        Top Notch Courses.
                    </p>
                </div>

            </div>

            <div className="w-[60%] rounded-t-full mt-14 h-100  flex items-center justify-center relative bg-blue-950">
                <img
                    className="w-120 h-120 bottom-0  absolute" 
                    src="/main-image-hero.png" alt="main image on the hero section" />
                
            </div>  
            <div className="w-[20%] flex flex-col gap-8">  
                <img

                className="fill-white z-20 w-40 -rotate-15" 
                src="/icons/idea.png"/>
               <div className="flex gap-5 items-center">
                    {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <FaStar size={30} color="gold" />
                    
                    </div>
                    ))}
               </div>
                <p className="text-white text-3xl font-medium">
                    4.9/5 Average Course Rating
                </p>
            </div>
       </div>

    </section>
  )
}

export default MainSectionOfHero