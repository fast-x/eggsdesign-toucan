import { API_RESOURCE } from '../../config';
import axiosInstance from '../ajax/axiosInstance';
import { Approach } from '../../types/Shared';

function getApproach(id: string) {
  return axiosInstance.get<Approach>(`${API_RESOURCE.APPROACHES}/${id}`).then(({ data }) => data);
}

export default getApproach;
