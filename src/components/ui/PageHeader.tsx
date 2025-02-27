import React from 'react';
import { cn } from '@/utils/cn';
import Card from './Card';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon,
  action,
  className
}) => {
  return (
    <Card className={cn("mb-8", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="bg-primary-100 dark:bg-primary-900/50 rounded-lg p-3 text-primary-600 dark:text-primary-400">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
            {description && (
              <p className="mt-1 text-gray-500 dark:text-gray-400">{description}</p>
            )}
          </div>
        </div>
        {action && (
          <div>{action}</div>
        )}
      </div>
    </Card>
  );
};

export default PageHeader;