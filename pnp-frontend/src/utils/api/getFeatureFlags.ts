import { API_RESOURCE } from '../../config';
import axiosInstance from '../ajax/axiosInstance';
import { FeatureFlag } from '../../contexts/FeatureContext';

function getFeatureFlags() {
  return axiosInstance.get<{ featureFlags: FeatureFlag[] }>(API_RESOURCE.FEATURES).then(({ data }) => data);
}

export default getFeatureFlags;
