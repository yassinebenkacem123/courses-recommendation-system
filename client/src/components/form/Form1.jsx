const Form1 = ({ onSelect }) => {
  const options = [
    "Learn a new programming language or a technology",
    "Learn to code (beginner)",
    "Prepare for an interview"
  ];

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">What brought you here?</h2>
      <div className="space-y-4">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className="w-full text-left p-6 border-2 border-gray-100 rounded-xl hover:border-blue-400/40 transition-all duration-200 text-lg font-medium text-slate-700"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Form1;