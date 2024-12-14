import { useQuery } from 'react-query';
import getClients from '../../utils/api/getClients';

function useGetClients(query?: string) {
  return useQuery(`clients-${String(query)}`, () => getClients(query));
}

export default useGetClients;
