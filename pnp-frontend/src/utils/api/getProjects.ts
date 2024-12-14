import { API_RESOURCE } from '../../config';
import axiosInstance from '../ajax/axiosInstance';
import Project from '../../types/Project';

function getProjects() {
  return axiosInstance.get<Project[]>(API_RESOURCE.PROJECTS).then(({ data }) => data);
}

export default getProjects;
