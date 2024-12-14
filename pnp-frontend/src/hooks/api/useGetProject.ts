import { useQuery } from 'react-query';
import getProject from '../../utils/api/getProject';

function useGetProject(id: string) {
  return useQuery(`project-${id || ''}`, () => getProject(id || ''));
}

export default useGetProject;
