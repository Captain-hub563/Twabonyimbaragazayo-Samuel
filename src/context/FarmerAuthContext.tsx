import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FarmerUser, SoilAnalysisRequest, PlantDiagnosisRequest } from '../types';

interface FarmerAuthContextProps {
  user: FarmerUser | null;
  savedSoilTests: SoilAnalysisRequest[];
  savedDiagnoses: PlantDiagnosisRequest[];
  registerFarmer: (data: Omit<FarmerUser, 'id' | 'registeredAt' | 'isAuthenticated'>) => Promise<boolean>;
  loginFarmer: (phone: string) => Promise<boolean>;
  logoutFarmer: () => void;
  saveSoilRecord: (record: SoilAnalysisRequest) => void;
  saveDiagnosisRecord: (record: PlantDiagnosisRequest) => void;
  cloudSyncStatus: {
    isConfigured: boolean;
    provider: string;
    message: string;
  };
}

const FarmerAuthContext = createContext<FarmerAuthContextProps | undefined>(undefined);

const USER_STORAGE_KEY = 'rw_smart_farming_user';
const SOIL_STORAGE_KEY = 'rw_smart_farming_soil_records';
const DIAG_STORAGE_KEY = 'rw_smart_farming_diag_records';

export const FarmerAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FarmerUser | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [savedSoilTests, setSavedSoilTests] = useState<SoilAnalysisRequest[]>(() => {
    try {
      const saved = localStorage.getItem(SOIL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [savedDiagnoses, setSavedDiagnoses] = useState<PlantDiagnosisRequest[]>(() => {
    try {
      const saved = localStorage.getItem(DIAG_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [];
  });

  const cloudSyncStatus = {
    isConfigured: false,
    provider: 'Local Storage & Cloud SQL / Firebase Staged',
    message: 'Profile stored safely in browser cache. Cloud backend database ready for provisioning.'
  };

  const registerFarmer = async (
    data: Omit<FarmerUser, 'id' | 'registeredAt' | 'isAuthenticated'>
  ): Promise<boolean> => {
    const newUser: FarmerUser = {
      ...data,
      id: `FARMER-${Date.now().toString().slice(-6)}`,
      registeredAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      isAuthenticated: true
    };
    setUser(newUser);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    } catch {
      // ignore
    }
    return true;
  };

  const loginFarmer = async (phone: string): Promise<boolean> => {
    // If existing registered user matches phone
    if (user && user.phoneNumber.replace(/\s+/g, '') === phone.replace(/\s+/g, '')) {
      const updated = { ...user, isAuthenticated: true };
      setUser(updated);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
      return true;
    }
    
    // Create new quick session for this phone number if not previously registered
    const defaultUser: FarmerUser = {
      id: `FARMER-${Date.now().toString().slice(-6)}`,
      fullName: 'Farmer ' + phone.slice(-4),
      phoneNumber: phone,
      province: 'Northern',
      district: 'Musanze',
      sector: 'Muhoza',
      farmSizeAres: 25,
      primaryCrops: ['Irish Potato (Kinigi)', 'Maize'],
      preferredLanguage: 'en',
      registeredAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      isAuthenticated: true
    };
    setUser(defaultUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(defaultUser));
    return true;
  };

  const logoutFarmer = () => {
    if (user) {
      const loggedOut = { ...user, isAuthenticated: false };
      setUser(loggedOut);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedOut));
    }
  };

  const saveSoilRecord = (record: SoilAnalysisRequest) => {
    setSavedSoilTests((prev) => {
      const updated = [record, ...prev];
      try {
        localStorage.setItem(SOIL_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const saveDiagnosisRecord = (record: PlantDiagnosisRequest) => {
    setSavedDiagnoses((prev) => {
      const updated = [record, ...prev];
      try {
        localStorage.setItem(DIAG_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  return (
    <FarmerAuthContext.Provider
      value={{
        user,
        savedSoilTests,
        savedDiagnoses,
        registerFarmer,
        loginFarmer,
        logoutFarmer,
        saveSoilRecord,
        saveDiagnosisRecord,
        cloudSyncStatus
      }}
    >
      {children}
    </FarmerAuthContext.Provider>
  );
};

export const useFarmerAuth = (): FarmerAuthContextProps => {
  const context = useContext(FarmerAuthContext);
  if (!context) {
    throw new Error('useFarmerAuth must be used within a FarmerAuthProvider');
  }
  return context;
};
