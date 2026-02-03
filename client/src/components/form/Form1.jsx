const Form1 = ({ onSelect }) => {
  const categories = [
    'Design',
    'Development',
    'Marketing',
    'Teaching & Academics',
    'IT & Software',
    'Personal Development',
  ];

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">
        Which course category interests you most?
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Choose the main category that best matches what you want to learn.
      </p>
      <div className="space-y-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className="w-full text-left p-6 border-2 border-gray-100 rounded-xl hover:border-blue-400/40 transition-all duration-200 text-lg font-medium text-slate-700"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Form1;