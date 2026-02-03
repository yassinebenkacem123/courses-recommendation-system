const Form4 = ({ onSelect }) => {
  const priceOptions = [
    'Free only',
    'Paid – under $20',
    'Paid – under $50',
    'Any price',
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">
        What is your budget for this course?
      </h2>
      <p className="text-center text-gray-500 mb-8">
        We will recommend courses that fit your price preferences.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {priceOptions.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className="px-6 py-2 border-2 border-gray-300 rounded-full hover:bg-blue-700 hover:text-white transition-colors font-semibold"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Form4;