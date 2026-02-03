const Form3 = ({ onSelect }) => {
  const topics = [
    'WordPress',
    'Adobe Premiere',
    'Microsoft Access',
    'Excel',
    'Java',
    'Web Design',
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">
        Which topic best matches your interest?
      </h2>
      <p className="text-center text-gray-500 mb-8">
        We will look for courses whose topic closely matches your choice.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => onSelect(topic)}
            className="p-4 border-2 border-gray-200 rounded-lg font-bold text-slate-700 hover:border-blue-400/40 transition-all"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Form3;