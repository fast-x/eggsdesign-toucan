import { useQuery } from 'react-query';
import getEmployee from '../../utils/api/getEmployee';

function useGetEmployee(id: string) {
  return useQuery(`employee-${id || ''}`, () => getEmployee(id || ''));
}

export default useGetEmployee;
