import { API_RESOURCE } from '../../config';
import axiosInstance from '../ajax/axiosInstance';

function updateDocument<T>(id: string, fields: object) {
  return axiosInstance.patch<T>(`${API_RESOURCE.DOCUMENTS}/${id}`, fields).then(({ data }) => data);
}

export default updateDocument;
