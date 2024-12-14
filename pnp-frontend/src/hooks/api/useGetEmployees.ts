import { useQuery } from 'react-query';
import getEmployees from '../../utils/api/getEmployees';

function useGetEmployees() {
  return useQuery('employees', getEmployees);
}

export default useGetEmployees;
