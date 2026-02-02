const Form3 = ({ onSelect }) => {
  const areas = ["Backend", "Database", "Machine Learning", "Software Development", "Gen AI", "Interview Prep", "Frontend", "API", "Data Science"];

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">What is your main area of interest?</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {areas.map((area) => (
          <button key={area} onClick={() => onSelect(area)} className="p-4 border-2 border-gray-200 rounded-lg font-bold text-slate-700  hover:border-blue-400/40  transition-all">
            {area}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Form3;