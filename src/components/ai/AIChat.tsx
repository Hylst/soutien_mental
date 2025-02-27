import React, { useState, useEffect, useRef } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import AIMessage from './AIMessage';
import ChatInput from './ChatInput';
import SuggestionChip from './SuggestionChip';
import type { AIResponse } from '@/services/ai';
import type { UserProfile } from '@/types/profile';

interface AIChatProps {
  onSendMessage: (message: string) => Promise<AIResponse>;
  suggestions?: string[];
  userProfile?: Partial<UserProfile>;
  type: 'motivation' | 'creativity';
}

const AIChat: React.FC<AIChatProps> = ({
  onSendMessage,
  suggestions = [],
  userProfile,
  type
}) => {
  const [messages, setMessages] = useState<Array<{
    content: string;
    role: 'user' | 'assistant';
    type?: 'motivation' | 'creativity' | 'general';
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (isLoading) return;

    setMessages(prev => [...prev, { role: 'user', content }]);
    setIsLoading(true);

    try {
      const response = await onSendMessage(content);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.content,
        type: response.type
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Je suis désolé, une erreur est survenue. Veuillez réessayer.",
        type: 'general'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
          <Bot className="h-5 w-5 text-primary-600" />
          <p className="text-sm text-gray-600">
            {type === 'motivation' 
              ? "Je suis là pour vous motiver et vous aider à atteindre vos objectifs."
              : "Je suis là pour stimuler votre créativité et explorer de nouvelles idées."}
          </p>
        </div>

        {messages.map((message, index) => (
          <AIMessage
            key={index}
            content={message.content}
            role={message.role}
            type={message.type}
          />
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg animate-pulse">
            <Sparkles className="h-5 w-5 text-primary-600" />
            <p className="text-sm text-gray-600">En train de réfléchir...</p>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {suggestions.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <SuggestionChip
                key={index}
                text={suggestion}
                onClick={() => handleSendMessage(suggestion)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="p-4 border-t border-gray-200">
        <ChatInput
          onSend={handleSendMessage}
          disabled={isLoading}
          placeholder={type === 'motivation' 
            ? "Partagez vos défis ou objectifs..."
            : "Partagez vos idées ou blocages créatifs..."}
        />
      </div>
    </div>
  );
};

export default AIChat;