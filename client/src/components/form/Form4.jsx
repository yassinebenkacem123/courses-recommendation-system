const Form4 = ({ onSelect }) => {
  const skills = ["Python", "JavaScript", "Java", "C++", "React", "Go", "AWS", "Docker"];

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">What are you most interested in learning?</h2>
      <p className="text-center text-gray-500 mb-8">Select a skill to customize your experience</p>
      <div className="flex flex-wrap justify-center gap-3">
        {skills.map((skill) => (
          <button key={skill} onClick={() => onSelect(skill)} className="px-6 py-2 border-2 border-gray-300 rounded-full hover:bg-blue-700 hover:text-white transition-colors font-semibold">
            {skill}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Form4;