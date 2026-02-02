import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
const Reviews = () => {
    const reviews = [
        {
            id:1, 
            studentName:"Yassine Ben",
            reviewText:"The courses offered transformed my career. The hands-on projects and expert guidance were invaluable.",
            reviewTitle: "Full-Stack Web Development",
            studentImage:"",
            rating:5,
        },
        {
            id:2,
            studentName:"Meryam K.",
            reviewText:"An exceptional learning platform with a wide range of courses. The mentors are knowledgeable and supportive.",
            reviewTitle: "Data Science & Machine Learning",
            studentImage:"",
            rating:4.8,
        },
        {
            id:3,
            studentName:"Aya S.",
            reviewText:"I highly recommend these courses to anyone looking to upskill. The content is relevant and up-to-date.",
            reviewTitle: "Digital Marketing Mastery",
            studentImage:"",
            rating:4.9,
        }
    ]
  return (
   
    <section className='h-screen p-10 px-15'>
      <div className='w-full flex items-center justify-center'>
        <button className='px-2 font-medium w-50 py-2 text-lg border border-gray-400 rounded-full'>
          Reviews
        </button>
      </div>

      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-6xl text-center font-medium '>
            What Our Students Say About Us
        </h1>
        <p className='text-wrap  text-center mt-3 text-gray-500/80 font-thin text-xl w-[80%]'>
            Real stories from real people discover how our courses changing lives, one <br/> Success story at a time. 
        </p>
      </div>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10'>
            {
                reviews.map((review) =>
                    <div className="p-4 bg-blue-900  rounded-2xl">
                        <div className="bg-white p-5 h-65 rounded-2xl">
                            <h2 className="text-2xl font-bold mb-2 text-black">{review.reviewTitle}</h2>
                            <p className="text-gray-700 mb-4">{review.reviewText}</p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-white mr-4"> 
                                    {review.studentName.charAt(0)}
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-black">{review.studentName}</h3>
                                    <p className="text-yellow-500">Rating: {review.rating} / 5</p>
                                </div>
                            </div>

                        </div>

                    </div>
                )
            }
        </div>
        <div className="flex gap-5 w-full justify-center items-center py-3">
            <button className="p-4 cursor-pointer rounded-full bg-[#DDF246]">
                <MdOutlineKeyboardArrowLeft  size={32}/>
            </button>
            <button className="p-4 cursor-pointer rounded-full bg-[#DDF246]">
                <MdOutlineKeyboardArrowRight size={32} />
            </button>

        </div>
    </section>
  )
}

export default Reviews