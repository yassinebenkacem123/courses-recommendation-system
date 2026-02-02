const Form2 = ({ onSelect }) => {
  const levels = ["Haven't started - still a student", "Starting (less than 1 year)", "Entry Level (1-2 years)", "Mid-Level (3-9 years)", "Senior Level (10+ years)"];

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Where are you in your career right now?</h2>
      <div className="space-y-4">
        {levels.map((level) => (
          <button key={level} onClick={() => onSelect(level)} className="w-full text-left p-5 border-2 border-gray-200 rounded-lg  hover:border-blue-400/40  transition-colors">
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Form2;