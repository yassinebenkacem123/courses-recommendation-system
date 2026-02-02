import React from 'react';

const ExpertieCard = ({ expertie, isCenter }) => {
  return (
    <div className="relative overflow-hidden w-[85%] bg-amber-300 rounded-3xl transition-all duration-500 ease-in-out">
      <img
        src={expertie.picture}
        alt={expertie.name}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isCenter ? 'grayscale-0 scale-105' : 'grayscale'
        }`}
      />

      {isCenter && (
        <div className="absolute bottom-6 left-4 right-4 bg-white p-4 rounded-2xl shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-xl font-bold text-gray-900">{expertie.name}</h1>
          <p className="text-sm text-gray-600">{expertie.role}</p>
        </div>
      )}
    </div>
  );
};

export default ExpertieCard;