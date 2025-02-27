import React, { useState } from 'react';
import { BookOpen, Brain, Users, Activity, Sparkles, Play, Coffee, Heart, Star, ChevronDown, ChevronUp, Palette, Music, Zap, Target } from 'lucide-react';

interface ResourceContent {
  title: string;
  content: string;
}

const ResourceDetail = ({ title, content }: ResourceContent) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-t border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="text-sm font-medium text-gray-900">{title}</span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {isOpen && (
        <div className="mt-2 prose prose-sm text-gray-600">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

const resources = [
  {
    category: "Guides et tutoriels",
    items: [
      {
        icon: <BookOpen className="h-6 w-6" />,
        title: "Guide du freelance serein",
        description: "Un guide complet pour gérer votre activité freelance tout en préservant votre bien-être mental.",
        content: [
          {
            title: "Structurer sa journée de travail",
            content: "Commencez par identifier vos heures les plus productives. Pour la plupart des créatifs, c'est le matin. Réservez ces moments pour les tâches demandant le plus de créativité. Planifiez des pauses régulières toutes les 90 minutes pour maintenir votre énergie. Terminez votre journée en préparant celle du lendemain."
          },
          {
            title: "Gérer les relations clients",
            content: "Établissez des limites claires dès le début de la collaboration. Définissez vos horaires de disponibilité, vos délais de réponse et vos processus de travail. Utilisez des contrats clairs et détaillés. Communiquez régulièrement mais de manière structurée pour éviter la surcharge."
          },
          {
            title: "Fixer ses limites",
            content: "Apprenez à dire non aux projets qui ne correspondent pas à vos valeurs ou à votre charge de travail. Établissez des tarifs justes qui reflètent votre expertise. Définissez clairement vos horaires de travail et respectez-les."
          },
          {
            title: "Maintenir l'équilibre vie pro/perso",
            content: "Créez un espace de travail dédié et évitez de travailler dans votre chambre. Établissez des rituels pour marquer le début et la fin de votre journée de travail. Planifiez des activités sociales et des loisirs réguliers."
          }
        ]
      },
      {
        icon: <Brain className="h-6 w-6" />,
        title: "Bibliothèque créative",
        description: "Une collection d'exercices et de techniques pour stimuler votre créativité.",
        content: [
          {
            title: "Exercices de déblocage créatif",
            content: "La technique des 'Trois Perspectives': Prenez votre défi créatif et examinez-le depuis trois angles différents - celui d'un enfant, d'un scientifique et d'un artiste. Notez les idées qui émergent de chaque perspective. Combinez ensuite les insights les plus intéressants."
          },
          {
            title: "Techniques de brainstorming",
            content: "Méthode SCAMPER: Substituez, Combinez, Adaptez, Modifiez, Proposez d'autres usages, Éliminez, Réorganisez. Appliquez chaque verbe à votre projet pour générer de nouvelles idées. Passez 2 minutes sur chaque étape."
          },
          {
            title: "Rituels d'inspiration",
            content: "Créez un 'Mur d'inspiration' physique ou digital. Chaque matin, passez 10 minutes à y ajouter un élément et à observer les connexions qui se créent. Utilisez des images, des mots, des couleurs qui résonnent avec votre projet actuel."
          },
          {
            title: "Gestion du syndrome de l'imposteur",
            content: "Tenez un journal de vos réussites. Chaque vendredi, notez trois accomplissements de la semaine, même minimes. Relisez-le quand le doute s'installe. Partagez vos expériences avec d'autres créatifs qui vivent la même chose."
          }
        ]
      }
    ]
  },
  {
    category: "Bien-être quotidien",
    items: [
      {
        icon: <Activity className="h-6 w-6" />,
        title: "Routines bien-être",
        description: "Des routines personnalisables pour maintenir votre équilibre au quotidien.",
        content: [
          {
            title: "Routine matinale énergisante",
            content: "1. Hydratation (1 grand verre d'eau) 2. 5 minutes d'étirements doux 3. 3 respirations profondes avec visualisation positive 4. 10 minutes de méditation ou de lecture inspirante 5. Définition des 3 priorités du jour"
          },
          {
            title: "Pauses actives",
            content: "Toutes les 2 heures: 1. Exercice de respiration carrée (4-4-4-4) 2. Étirements du cou et des épaules 3. 2 minutes de marche 4. Exercice de recentrage: nommer 5 choses que vous voyez, 4 que vous touchez, 3 que vous entendez, 2 que vous sentez, 1 que vous goûtez"
          },
          {
            title: "Rituel du soir apaisant",
            content: "1 heure avant le coucher: 1. Revue de la journée avec 3 gratitudes 2. Préparation douce du lendemain 3. Étirements relaxants 4. Lecture légère ou méditation 5. Visualisation positive pour le lendemain"
          },
          {
            title: "Exercices de respiration",
            content: "Technique 4-7-8: Inspirez sur 4 temps, retenez sur 7, expirez sur 8. Répétez 4 fois. Idéal pour calmer l'anxiété et améliorer la concentration. À pratiquer avant les moments de stress ou de créativité intense."
          }
        ]
      },
      {
        icon: <Heart className="h-6 w-6" />,
        title: "Auto-compassion",
        description: "Apprenez à prendre soin de vous avec bienveillance.",
        content: [
          {
            title: "Méditations guidées",
            content: "Méditation de l'ancrage (5 min): 1. Asseyez-vous confortablement 2. Respirez profondément 3. Imaginez des racines partant de vos pieds 4. Visualisez-les s'enfonçant dans le sol 5. Ressentez la stabilité et le soutien de la terre"
          },
          {
            title: "Journal de gratitude",
            content: "Chaque soir, répondez à ces questions: 1. Qu'est-ce qui m'a fait sourire aujourd'hui? 2. Quelle difficulté ai-je surmontée? 3. Quelle qualité ai-je manifestée? 4. Qui m'a aidé ou inspiré? 5. Que puis-je célébrer, même petit?"
          },
          {
            title: "Affirmations positives",
            content: "Choisissez 3 affirmations qui résonnent avec vous: 'Je suis capable d'apprendre et de grandir', 'Mes défis m'aident à progresser', 'Ma créativité s'exprime naturellement'. Répétez-les le matin en vous préparant."
          },
          {
            title: "Gestion des émotions",
            content: "Technique RAIN: Reconnaître l'émotion, Accepter sa présence, Investiguer avec curiosité, Nourrir avec auto-compassion. Appliquez cette méthode quand une émotion difficile surgit."
          }
        ]
      }
    ]
  },
  {
    category: "Outils créatifs",
    items: [
      {
        icon: <Palette className="h-6 w-6" />,
        title: "Stimulation créative",
        description: "Techniques et exercices pour développer votre créativité.",
        content: [
          {
            title: "Cartes d'association aléatoire",
            content: "Créez un jeu de cartes avec des mots, images ou concepts aléatoires. Tirez-en deux au hasard et forcez des connexions entre eux. Par exemple: 'montagne' + 'café' pourrait inspirer un logo pour une marque de café d'altitude."
          },
          {
            title: "La méthode des contraintes créatives",
            content: "Imposez-vous des limites pour stimuler la créativité. Par exemple: créer uniquement avec trois couleurs, utiliser uniquement des formes géométriques, ou concevoir sans texte. Les contraintes forcent l'innovation."
          },
          {
            title: "L'exploration sensorielle",
            content: "Changez d'environnement pour 30 minutes. Travaillez dans un parc, un café ou une bibliothèque. Notez comment les nouveaux stimuli sensoriels influencent vos idées. Créez une bibliothèque d'ambiances inspirantes."
          },
          {
            title: "Le défi des 100 idées",
            content: "Donnez-vous 20 minutes pour générer 100 idées sur votre projet, sans jugement. Les premières seront évidentes, puis viendront les plus originales. Ne vous arrêtez pas avant d'avoir atteint 100, même si elles semblent absurdes."
          }
        ]
      },
      {
        icon: <Target className="h-6 w-6" />,
        title: "Productivité créative",
        description: "Méthodes pour optimiser votre flux de travail créatif.",
        content: [
          {
            title: "La méthode Pomodoro créative",
            content: "Adaptez la technique Pomodoro à votre flux créatif: 45 minutes de création intense, suivies de 15 minutes de pause réflexive. Pendant la pause, notez vos insights et préparez la prochaine session."
          },
          {
            title: "Le journal de processus",
            content: "Documentez votre processus créatif quotidiennement. Notez vos décisions, intuitions et apprentissages. Relisez-le régulièrement pour identifier vos patterns de productivité et d'inspiration."
          },
          {
            title: "La matrice d'énergie créative",
            content: "Créez un tableau de vos tâches selon deux axes: énergie requise (haute/basse) et type de créativité (divergente/convergente). Planifiez vos journées en respectant vos cycles d'énergie naturels."
          },
          {
            title: "Les rituels de transition",
            content: "Établissez des rituels pour passer d'un projet à l'autre. Par exemple: 5 minutes de croquis libres, une courte méditation, ou un changement d'espace de travail. Cela aide à maintenir la fraîcheur créative."
          }
        ]
      }
    ]
  },
  {
    category: "Gestion du stress",
    items: [
      {
        icon: <Zap className="h-6 w-6" />,
        title: "Techniques anti-stress",
        description: "Méthodes efficaces pour gérer le stress professionnel.",
        content: [
          {
            title: "Scan corporel express",
            content: "En 3 minutes: 1. Asseyez-vous confortablement 2. Fermez les yeux 3. Parcourez votre corps des pieds à la tête 4. Notez les zones de tension 5. Respirez profondément dans ces zones 6. Visualisez la tension qui se dissout"
          },
          {
            title: "Ancrage émotionnel",
            content: "Créez un 'kit anti-stress': 1. Un objet à toucher (pierre lisse, balle anti-stress) 2. Une image apaisante 3. Une musique calme 4. Une huile essentielle relaxante 5. Un mot ou mantra personnel. Utilisez-le dès que le stress monte."
          },
          {
            title: "Micro-pauses énergétiques",
            content: "Toutes les heures: 1. Étirez-vous comme si vous vous réveilliez 2. Secouez doucement vos membres 3. Faites 3 rotations des épaules 4. Massez légèrement votre nuque 5. Prenez 3 respirations profondes"
          },
          {
            title: "Visualisation éclair",
            content: "En 60 secondes: 1. Fermez les yeux 2. Imaginez un lieu ressourçant 3. Notez 3 détails sensoriels 4. Respirez l'atmosphère de ce lieu 5. Revenez doucement en emportant cette sensation de calme"
          }
        ]
      },
      {
        icon: <Music className="h-6 w-6" />,
        title: "Ambiances sonores",
        description: "Utilisez le son pour améliorer votre concentration et réduire le stress.",
        content: [
          {
            title: "Playlists thématiques",
            content: "Créez des playlists spécifiques: 1. Musique focus (sans paroles, 60-80 BPM) 2. Sons naturels pour la créativité 3. Rythmes énergisants pour les deadlines 4. Mélodies calmes pour la réflexion"
          },
          {
            title: "Technique du bruit blanc",
            content: "Utilisez différents types de bruits pour différentes tâches: 1. Bruit blanc pour masquer les distractions 2. Bruit rose pour la créativité 3. Bruit brun pour la concentration profonde"
          },
          {
            title: "Méditation sonore",
            content: "Pratique de 5 minutes: 1. Mettez des écouteurs 2. Choisissez un son binaural à 432Hz 3. Fermez les yeux 4. Concentrez-vous uniquement sur le son 5. Laissez votre esprit se recentrer"
          },
          {
            title: "Rythmes de travail",
            content: "Synchronisez votre travail avec des cycles sonores: 25 minutes de son focalisé, 5 minutes de pause en silence. Utilisez des sons qui évoluent naturellement pour marquer le temps sans interruption brutale."
          }
        ]
      }
    ]
  }
];

const Resources = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Ressources</h1>
        <p className="mt-2 text-gray-600">
          Une collection de ressources pratiques pour soutenir votre bien-être et votre créativité.
        </p>
      </div>

      <div className="space-y-12">
        {resources.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {section.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.items.map((resource, resourceIndex) => (
                <div
                  key={resourceIndex}
                  className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-primary-100 rounded-lg p-3 text-primary-600">
                      {resource.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {resource.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {resource.description}
                  </p>
                  <div className="divide-y divide-gray-200">
                    {resource.content.map((item, itemIndex) => (
                      <ResourceDetail
                        key={itemIndex}
                        title={item.title}
                        content={item.content}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;