import React, { useEffect, useState } from 'react';
import getFeatureFlags from '../utils/api/getFeatureFlags';
export interface FeatureFlag {
  active: boolean;
  name: string;
  _type: 'featureFlag';
}
interface Features {
  searchFilters?: boolean;
  contentEditing?: boolean;
}

const FeatureContext = React.createContext<{ features: Features }>({ features: {} });
export const FeatureProvider: React.FC = ({ children }) => {
  const [features, setFeatures] = useState<Features>({});

  const createFeaturesObject = (featureFlags: FeatureFlag[]) => {
    return featureFlags.reduce((acc, current) => {
      return { ...acc, [current.name]: current.active };
    }, {});
  };

  useEffect(() => {
    getFeatureFlags().then((res: { featureFlags: FeatureFlag[] }) => {
      if (res && res.featureFlags) {
        const featuresObject = createFeaturesObject(res.featureFlags);
        setFeatures(featuresObject);
      }
    });
  }, [getFeatureFlags]);

  return <FeatureContext.Provider value={{ features }}>{children}</FeatureContext.Provider>;
};

export default FeatureContext;
