import React from 'react';
import { BookOpen, Code, Shield, Brain, Sparkles, Cloud, Database, Wifi, WifiOff } from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/ui/PageHeader';

const About = () => {
  return (
    <Container>
      <PageHeader
        title="À propos de Soutien Mental"
        description="Une application moderne pour le bien-être mental et la créativité"
        icon={<BookOpen className="h-6 w-6" />}
      />

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Présentation</h2>
          <Card>
            <p className="text-gray-600 mb-4">
              Soutien Mental est une application conçue pour accompagner les créatifs et les freelances dans leur bien-être mental et leur développement personnel. Elle combine des outils de suivi, des exercices guidés et une assistance IA personnalisée.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <Brain className="h-5 w-5 text-primary-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Bien-être mental</h3>
                  <p className="text-sm text-gray-500">Suivi d'humeur et exercices de méditation</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Sparkles className="h-5 w-5 text-primary-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Créativité</h3>
                  <p className="text-sm text-gray-500">Stimulation et déblocage créatif</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-primary-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Confidentialité</h3>
                  <p className="text-sm text-gray-500">Protection des données personnelles</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fonctionnalités principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Suivi et analyse</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Suivi quotidien de l'humeur</li>
                <li>• Journal des réalisations</li>
                <li>• Moments positifs</li>
                <li>• Visualisations et statistiques</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Exercices guidés</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Méditation et pleine conscience</li>
                <li>• Exercices de respiration</li>
                <li>• Visualisation créative</li>
                <li>• Pratique de la gratitude</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assistance IA</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Coach motivationnel personnalisé</li>
                <li>• Assistant créatif</li>
                <li>• Support multi-LLM (OpenAI, Gemini, Deepseek)</li>
                <li>• Conseils adaptés à votre profil</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ressources</h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Guides pratiques</li>
                <li>• Techniques créatives</li>
                <li>• Exercices de bien-être</li>
                <li>• Contenus personnalisés</li>
              </ul>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Aspects techniques</h2>
          <Card>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <Code className="h-5 w-5 text-primary-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Technologies modernes</h3>
                  <p className="text-sm text-gray-500">
                    Développée avec React, TypeScript et Vite pour des performances optimales.
                    Interface utilisateur réactive avec Tailwind CSS et Framer Motion.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Database className="h-5 w-5 text-primary-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Gestion des données</h3>
                  <p className="text-sm text-gray-500">
                    Synchronisation cloud avec Firebase/Supabase.
                    Base de données locale avec IndexedDB pour le mode hors ligne.
                    Chiffrement des données sensibles.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Cloud className="h-5 w-5 text-primary-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Intelligence Artificielle</h3>
                  <p className="text-sm text-gray-500">
                    Intégration de multiples modèles LLM (OpenAI, Google Gemini, Deepseek).
                    Gestion sécurisée des clés API avec chiffrement local.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Wifi className="h-5 w-5 text-primary-600 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Mode hors ligne</h3>
                  <p className="text-sm text-gray-500">
                    Fonctionnalités disponibles sans connexion.
                    Synchronisation automatique lors du retour en ligne.
                    File d'attente pour les opérations différées.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </Container>
  );
};

export default About;