import React from 'react';
import { Bot, User } from 'lucide-react';

interface AIMessageProps {
  content: string;
  role: 'assistant' | 'user';
  type?: 'motivation' | 'creativity' | 'general';
}

const AIMessage: React.FC<AIMessageProps> = ({ content, role, type }) => {
  const getBgColor = () => {
    if (role === 'user') return 'bg-primary-600 text-white';
    switch (type) {
      case 'motivation':
        return 'bg-yellow-50 text-yellow-800';
      case 'creativity':
        return 'bg-purple-50 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-900';
    }
  };

  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-lg p-4 ${getBgColor()}`}>
        <div className="flex items-start space-x-2">
          {role === 'assistant' && (
            <Bot className="h-5 w-5 mt-1 flex-shrink-0" />
          )}
          <div className="flex-1">
            <p className="text-sm">{content}</p>
          </div>
          {role === 'user' && (
            <User className="h-5 w-5 mt-1 flex-shrink-0" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AIMessage;