import React from 'react';
import { Download, Upload } from 'lucide-react';
import { exportProfileToJson, importProfileFromJson } from '../../utils/profileUtils';
import type { UserProfile } from '../../types/profile';

interface ImportExportProps {
  profile: UserProfile;
  onImport: (profile: UserProfile) => void;
}

const ImportExport: React.FC<ImportExportProps> = ({ profile, onImport }) => {
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const importedProfile = await importProfileFromJson(file);
      onImport(importedProfile);
    } catch (error) {
      console.error('Error importing profile:', error);
      alert('Erreur lors de l\'importation du profil. Vérifiez que le fichier est au bon format.');
    }
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={() => exportProfileToJson(profile)}
        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
      >
        <Download className="h-4 w-4" />
        Exporter les données
      </button>

      <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors cursor-pointer">
        <Upload className="h-4 w-4" />
        Importer les données
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ImportExport;