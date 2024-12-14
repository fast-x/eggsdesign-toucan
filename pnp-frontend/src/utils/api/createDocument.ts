import { API_RESOURCE } from '../../config';
import axiosInstance from '../ajax/axiosInstance';

function createDocument<T>(fields: object) {
  return axiosInstance.post<T>(API_RESOURCE.DOCUMENTS, fields).then(({ data }) => data);
}

export default createDocument;
