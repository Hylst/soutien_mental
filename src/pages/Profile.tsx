import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User as FirebaseUser } from 'firebase/auth';
import { UserProfile, PROFILE_OPTIONS } from '../types/profile';
import { Loader2, Save, User as UserIcon } from 'lucide-react';
import MultiSelect from '../components/profile/MultiSelect';
import ImportExport from '../components/profile/ImportExport';

const defaultProfile: UserProfile = {
  displayName: '',
  profession: '',
  country: '',
  city: '',
  languages: [],
  workStyle: [],
  industry: '',
  mbtiType: '',
  hobbies: [],
  passions: [],
  culturalInterests: [],
  sportsActivities: [],
  learningInterests: [],
  personalGoals: []
};

const Profile = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    const fetchProfile = async (user: FirebaseUser) => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          setProfile({
            ...defaultProfile,
            displayName: user.displayName || ''
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile(user);
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      await setDoc(doc(db, 'users', user.uid), {
        ...profile,
        updatedAt: new Date()
      }, { merge: true });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <UserIcon className="h-6 w-6 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">Profil utilisateur</h1>
          </div>
          <ImportExport profile={profile} onImport={setProfile} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom ou pseudo
              </label>
              <input
                type="text"
                value={profile.displayName || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profession
              </label>
              <input
                type="text"
                value={profile.profession || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, profession: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pays
              </label>
              <input
                type="text"
                value={profile.country || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, country: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ville
              </label>
              <input
                type="text"
                value={profile.city || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="space-y-6">
            <MultiSelect
              label="Langues parlées"
              options={PROFILE_OPTIONS.languages}
              selected={profile.languages || []}
              onChange={(values) => setProfile(prev => ({ ...prev, languages: values }))}
            />

            <MultiSelect
              label="Style de travail"
              options={PROFILE_OPTIONS.workStyles}
              selected={profile.workStyle || []}
              onChange={(values) => setProfile(prev => ({ ...prev, workStyle: values }))}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type MBTI
              </label>
              <select
                value={profile.mbtiType || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, mbtiType: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Sélectionner...</option>
                {PROFILE_OPTIONS.mbtiTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <MultiSelect
              label="Hobbies"
              options={PROFILE_OPTIONS.hobbies}
              selected={profile.hobbies || []}
              onChange={(values) => setProfile(prev => ({ ...prev, hobbies: values }))}
            />

            <MultiSelect
              label="Intérêts culturels"
              options={PROFILE_OPTIONS.culturalInterests}
              selected={profile.culturalInterests || []}
              onChange={(values) => setProfile(prev => ({ ...prev, culturalInterests: values }))}
            />

            <MultiSelect
              label="Activités sportives"
              options={PROFILE_OPTIONS.sportsActivities}
              selected={profile.sportsActivities || []}
              onChange={(values) => setProfile(prev => ({ ...prev, sportsActivities: values }))}
            />

            <MultiSelect
              label="Centres d'apprentissage"
              options={PROFILE_OPTIONS.learningInterests}
              selected={profile.learningInterests || []}
              onChange={(values) => setProfile(prev => ({ ...prev, learningInterests: values }))}
            />
          </div>

          {success && (
            <div className="p-4 bg-green-50 text-green-700 rounded-md">
              Profil mis à jour avec succès !
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <Save className="h-5 w-5" />
                <span>Enregistrer le profil</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;