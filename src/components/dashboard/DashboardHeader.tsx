import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { BarChart2 } from 'lucide-react';
import PageHeader from '../ui/PageHeader';
import type { UserProfile } from '@/types/profile';

interface DashboardHeaderProps {
  userProfile: UserProfile | null;
  userEmail?: string | null;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userProfile, userEmail }) => {
  const displayName = userProfile?.displayName || userEmail?.split('@')[0] || 'Invité';
  const currentTime = new Date();

  return (
    <PageHeader
      title={`Bonjour ${displayName}`}
      description={format(currentTime, "EEEE d MMMM yyyy", { locale: fr })}
      icon={<BarChart2 className="h-6 w-6" />}
    />
  );
};

export default DashboardHeader;