import { useQuery } from 'react-query';
import getApproaches from '../../utils/api/getApproaches';

function useGetApproaches() {
  return useQuery('approaches', getApproaches);
}

export default useGetApproaches;
