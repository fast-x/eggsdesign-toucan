import { API_RESOURCE } from '../../config';
import axiosInstance from '../ajax/axiosInstance';
import Employee from '../../types/Employee';

function getEmployee(id: string) {
  return axiosInstance.get<Employee>(`${API_RESOURCE.EMPLOYEES}/${id}`).then(({ data }) => data);
}

export default getEmployee;
