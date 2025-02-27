import React, { useState } from 'react';
import { Sparkles, Lightbulb, Palette, Music, Camera, PenTool } from 'lucide-react';
import Container from '../components/ui/Container';

const categories = [
  {
    id: 'ideation',
    icon: <Lightbulb className="h-6 w-6" />,
    title: 'Idéation',
    description: 'Générez des idées créatives pour vos projets',
    prompts: [
      'Je cherche des idées pour...',
      'Comment puis-je innover dans...',
      'Quelles alternatives à...'
    ]
  },
  {
    id: 'visual',
    icon: <Palette className="h-6 w-6" />,
    title: 'Design visuel',
    description: 'Explorez des concepts visuels et esthétiques',
    prompts: [
      'Quelle palette de couleurs pour...',
      'Comment structurer visuellement...',
      'Quel style graphique pour...'
    ]
  },
  {
    id: 'content',
    icon: <PenTool className="h-6 w-6" />,
    title: 'Création de contenu',
    description: 'Développez du contenu engageant',
    prompts: [
      'Comment raconter l\'histoire de...',
      'Quels angles pour présenter...',
      'Comment structurer mon article sur...'
    ]
  }
];

const CreativeAssistant: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handlePromptSubmit = (prompt: string) => {
    // Simuler des suggestions créatives
    const mockSuggestions = [
      "Explorez les contrastes entre tradition et modernité",
      "Intégrez des éléments naturels dans votre concept",
      "Utilisez la technique du storytelling inversé",
      "Combinez des influences culturelles différentes"
    ];
    setSuggestions(mockSuggestions);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Container className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-primary-100 rounded-lg p-3">
            <Sparkles className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Assistant Créatif</h1>
            <p className="text-gray-600">
              Stimulez votre créativité et explorez de nouvelles idées
            </p>
          </div>
        </div>
      </Container>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`cursor-pointer transition-all duration-300 ${
              selectedCategory === category.id ? 'ring-2 ring-primary-500' : ''
            }`}
          >
            <Container className="h-full hover:shadow-md">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-primary-100 rounded-lg p-2 text-primary-600">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                {category.description}
              </p>
              <div className="space-y-2">
                {category.prompts.map((prompt, index) => (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePromptSubmit(prompt);
                    }}
                    className="text-left text-sm text-gray-700 hover:text-primary-600 transition-colors cursor-pointer"
                  >
                    {prompt}
                  </div>
                ))}
              </div>
            </Container>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <Container>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Votre prompt personnalisé
            </h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Décrivez votre défi créatif..."
                className="flex-1 rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
              />
              <button
                onClick={() => handlePromptSubmit(customPrompt)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Explorer
              </button>
            </div>
          </div>

          {suggestions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Suggestions créatives
              </h3>
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <p className="text-gray-700">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default CreativeAssistant;