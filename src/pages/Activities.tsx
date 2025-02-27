import React from 'react';
import { Link } from 'react-router-dom';
import { activities } from '../data/activities';
import Container from '../components/ui/Container';
import Card from '../components/ui/Card';

const Activities: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Container className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Activités guidées
        </h1>
        <p className="text-gray-600">
          Découvrez nos activités conçues pour améliorer votre bien-être mental et stimuler votre créativité.
        </p>
      </Container>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <Link
            key={activity.type}
            to={`/activity/${activity.type}`}
            className="group"
          >
            <Card hover className="h-full">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 rounded-lg p-3 text-primary-600">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                      {activity.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {activity.duration}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Activities;