import { API_RESOURCE } from '../../config';
import Employee from '../../types/Employee';
import axiosInstance from '../ajax/axiosInstance';

function getEmployees() {
  return axiosInstance.get<Employee[]>(API_RESOURCE.EMPLOYEES).then(({ data }) => data);
}

export default getEmployees;
