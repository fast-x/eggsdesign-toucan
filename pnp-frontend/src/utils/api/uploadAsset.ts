import { API_RESOURCE } from '../../config';
import axiosInstance from '../ajax/axiosInstance';

function uploadAsset(asset: Blob | File) {
  const formData = new FormData();
  formData.append('file', asset);

  return axiosInstance.post(API_RESOURCE.ASSETS, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 15000,
  });
}

export default uploadAsset;
