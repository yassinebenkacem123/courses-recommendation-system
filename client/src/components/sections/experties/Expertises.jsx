import ExpertieCard from "./ExpertieCard"
import { motion } from "framer-motion"
const Expertises = () => {
  const experties = [
    {
      name: "Meryam Kada",
      role: "AI Specialist",
      picture: "",
    },
    {
      name: "Aya ...",
      role: "Data Scientist",
      picture: "",
    },
    {
      name: "Chahd ...",
      role: "Machine Learning Engineer",
      picture: "",
    },
    {
      name: "Anass ...",
      role: "Full Stack Developer",
      picture: "",
    },
    {
      name: "Yassine Ben Kacem",
      role: "Full Stack Developer",
      picture: "/experties/yassine.jfif",
    }
  ]
  return (
    <section className='h-screen p-10 px-15'>
      <div className='w-full flex items-center justify-center'>
        <button className='px-2 font-medium w-50 py-2 text-lg border border-gray-400 rounded-full'>
          Our Mentors
        </button>
      </div>

      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-6xl text-center font-medium '>
          Meet Our Expert Mentors
        </h1>
        <p className='text-wrap  text-center mt-3 text-gray-500/80 font-thin text-xl w-[80%]'>
          Learn from industry leaders who are passionate about sharing their knowledge and guiding you on your learning journey.
        </p>
      </div>
      {/* Ticker Row Gallery */}
      <div className="overflow-hidden w-full mt-8">
        <motion.div
          className="flex "
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          {[...experties, ...experties].map((expertie, idx) => (
            <div className="shrink-0 w-[40%]" key={`${expertie.name}-${idx}`}>
              <ExpertieCard
                expertie={expertie}
                isCenter={expertie.name === "Yassine Ben Kacem"}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Expertises