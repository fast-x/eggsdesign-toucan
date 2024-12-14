import { API_RESOURCE } from '../../config';
import axiosInstance from '../ajax/axiosInstance';
import { BaseDocumentSchema } from '../../types/Shared';

function deleteDocument(id: string) {
  return axiosInstance.delete<BaseDocumentSchema>(`${API_RESOURCE.DOCUMENTS}/${id}`).then(({ data }) => data);
}

export default deleteDocument;
