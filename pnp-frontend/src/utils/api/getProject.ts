import { API_RESOURCE } from '../../config';
import axiosInstance from '../ajax/axiosInstance';
import Project from '../../types/Project';

function getProject(id: string) {
  return axiosInstance.get<Project>(`${API_RESOURCE.PROJECTS}/${id}`).then(({ data }) => data);
}

export default getProject;
