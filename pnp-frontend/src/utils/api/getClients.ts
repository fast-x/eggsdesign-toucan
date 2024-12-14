import { API_RESOURCE } from '../../config';
import axiosInstance from '../ajax/axiosInstance';
import { Client } from '../../types/Shared';

function getClients(query = '*'): Promise<Client[]> {
  return axiosInstance.get<Client[]>(API_RESOURCE.CLIENTS, { params: { query } }).then(({ data }) => data);
}

export default getClients;
