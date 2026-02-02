import React, { useEffect, useRef, useState } from 'react';
import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
import Form4 from './Form4';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MainForm = ({ onSubmitted }) => {
  const navigate = useNavigate();
  const hasSubmittedRef = useRef(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    reason: '',
    careerLevel: '',
    interestArea: '',
    specificSkill: ''
  });

  const nextStep = () => setStep((prev) => prev + 1);

  const updateData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    nextStep();
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <Form1 onSelect={(val) => updateData('reason', val)} />;
      case 2: return <Form2 onSelect={(val) => updateData('careerLevel', val)} />;
      case 3: return <Form3 onSelect={(val) => updateData('interestArea', val)} />;
      case 4: return <Form4 onSelect={(val) => updateData('specificSkill', val)} />;
      default: return null;
    }
  };

  useEffect(() => {
    if (step === 5 && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;
      console.log('Onboarding form submitted with values:', formData);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('hasSubmittedMainForm', 'true');
      }
      toast.success('Thank you for submitting the form!');
      if (typeof onSubmitted === 'function') {
        onSubmitted();
      }
      navigate('/', { replace: true });
    }
  }, [step, formData, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl flex items-center justify-between mb-12">
        {[1, 2, 3, 4].map((s) => (
          <React.Fragment key={s}>
            <div className={`w-6 h-6 rounded-full ${step >= s ? 'bg-blue-600' : 'bg-gray-200'}`} />
            {s < 4 && <div className={`flex-1 h-1 mx-2 border-t-2 border-dashed ${step > s ? 'border-blue-400/40' : 'border-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        {renderStep()}
      </div>
    </div>
  );
};

export default MainForm;