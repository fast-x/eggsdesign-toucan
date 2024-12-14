import { API_RESOURCE } from '../../config';
import axiosInstance from '../ajax/axiosInstance';

async function getReferencesOfType<T>(type: string) {
  return axiosInstance.get<T>(API_RESOURCE.REFERENCES, { params: { type } }).then(({ data }) => data);
}

export default getReferencesOfType;
