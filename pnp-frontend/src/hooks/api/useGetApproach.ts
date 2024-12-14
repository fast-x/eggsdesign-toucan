import { useQuery } from 'react-query';
import getApproach from '../../utils/api/getApproach';

function useGetApproach(id: string) {
  return useQuery(`approach-${id || ''}`, () => getApproach(id || ''));
}

export default useGetApproach;
