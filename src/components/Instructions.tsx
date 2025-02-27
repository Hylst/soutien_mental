import React from 'react';

interface InstructionsProps {
  instructions: string[];
  currentStep: number;
  isActive: boolean;
}

const Instructions: React.FC<InstructionsProps> = ({ instructions, currentStep, isActive }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Instructions</h2>
      <div className="space-y-3">
        {instructions.map((instruction, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg transition-colors ${
              index === currentStep && isActive
                ? 'bg-primary-100 text-primary-700'
                : 'text-gray-600'
            }`}
          >
            {instruction}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructions;