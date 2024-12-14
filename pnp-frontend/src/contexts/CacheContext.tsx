import { useMemo, useState, createContext, useContext, FC } from 'react';
import Employee from '../types/Employee';
import Project from '../types/Project';

interface Cache {
  [key: string]: any;
  cachedEmployees: Employee[];
  cachedProjects: Project[];
}

interface CacheContext {
  cachedData: Cache;
  storeData: (data: Record<string, any>) => void;
}

const CacheContext = createContext<CacheContext | undefined>(undefined);

export function useCacheContext() {
  const context = useContext(CacheContext);
  if (context === undefined) {
    throw new Error('useCacheContext must be used within a CacheProvider');
  }
  return context;
}

export const CacheProvider: FC = ({ children }) => {
  const [cachedData, setCachedData] = useState({
    cachedEmployees: [],
    cachedProjects: [],
  });

  function storeData(data: Record<string, any>): void {
    setCachedData({ ...cachedData, ...data });
  }

  const value = useMemo(() => ({ cachedData, storeData }), [cachedData]);

  return <CacheContext.Provider value={value}>{children}</CacheContext.Provider>;
};

export default CacheContext;
