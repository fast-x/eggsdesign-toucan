import { API_RESOURCE } from '../../config';
import axiosInstance from '../ajax/axiosInstance';

function getFilters() {
  return axiosInstance.get(API_RESOURCE.FILTERS).then(({ data }: any) => data as { [key: string]: any });
}

export default getFilters;
