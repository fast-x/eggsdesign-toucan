import { useQuery } from 'react-query';
import getFilters from '../../utils/api/getFilters';

function useGetFilters() {
  return useQuery(`filters`, () => getFilters());
}

export default useGetFilters;
