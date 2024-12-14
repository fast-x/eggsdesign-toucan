import { API_RESOURCE } from '../../config';
import axiosInstance from '../ajax/axiosInstance';

function getDocument<T>(id: string) {
  return axiosInstance.get<T>(`${API_RESOURCE.DOCUMENTS}/${id}`).then(({ data }) => data);
}

export default getDocument;
