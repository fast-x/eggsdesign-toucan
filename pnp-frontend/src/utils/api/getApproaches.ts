import { API_RESOURCE } from '../../config';
import axiosInstance from '../ajax/axiosInstance';
import { Approach } from '../../types/Shared';

function getApproaches() {
  return axiosInstance.get<Approach[]>(API_RESOURCE.APPROACHES).then(({ data }) => data);
}

export default getApproaches;
