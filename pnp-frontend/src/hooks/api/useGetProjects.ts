import { useQuery } from 'react-query';
import getProjects from '../../utils/api/getProjects';

function useGetProjects() {
  return useQuery(`projects`, () => getProjects());
}

export default useGetProjects;
