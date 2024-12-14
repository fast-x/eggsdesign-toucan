import { useSearchParams } from 'react-router-dom';
import { ActionMeta } from 'react-select';
import { MultiSelectOption } from '../types';

const useFilterSearchQueryParameters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (
    name: string,
    option: readonly MultiSelectOption[],
    actionMeta: ActionMeta<MultiSelectOption>,
  ) => {
    if (actionMeta.action === 'clear') {
      searchParams.delete(name);
      setSearchParams(searchParams);
      return;
    }

    if (actionMeta.action === 'remove-value') {
      const allValuesWithSameName = searchParams.getAll(name);
      const valueToRemove = actionMeta?.removedValue?.value ?? '';

      // URLSearchParams currently doesn't have a way to remove a single index from an array parameter, this is a work around
      searchParams.delete(name);
      allValuesWithSameName
        .filter((value) => value !== valueToRemove)
        .forEach((value) => searchParams.append(name, value));
      setSearchParams(searchParams);
      return;
    }

    if (actionMeta.action === 'select-option') {
      // Create new filters, a reference to the currently set filter values?

      searchParams.append(name, actionMeta?.option?.value ?? '');
      setSearchParams(searchParams);
      return;
    }

    console.error('This action meta is currently not handled', actionMeta);
  };

  return { handleChange };
};

export default useFilterSearchQueryParameters;
