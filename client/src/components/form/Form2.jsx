const Form2 = ({ onSelect }) => {
  const levels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Any level',
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">
        What is your current course level?
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Pick the level that best matches the difficulty you are comfortable with.
      </p>
      <div className="space-y-4">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => onSelect(level)}
            className="w-full text-left p-5 border-2 border-gray-200 rounded-lg hover:border-blue-400/40 transition-colors"
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Form2;