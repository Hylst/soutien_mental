import React from 'react';
import { AlertCircle } from 'lucide-react';

interface DashboardErrorProps {
  message: string;
}

const DashboardError: React.FC<DashboardErrorProps> = ({ message }) => {
  return (
    <div className="mb-8 p-4 bg-red-50 rounded-lg flex items-center space-x-3 text-red-700">
      <AlertCircle className="h-5 w-5 flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
};

export default DashboardError;