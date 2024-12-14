import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../../../hooks/use-debounce';
import { STRING_SEARCH_VALUES } from '../constants';

interface IConfig {
  queryNames: STRING_SEARCH_VALUES[];
}

const getDefaultSearchPhrase = (queryNames: STRING_SEARCH_VALUES[], searchParams: URLSearchParams): string => {
  let defaultSearchPhrase = '';
  queryNames.forEach((param) => {
    const defaultQuery = searchParams.get(param);
    if (defaultQuery && !defaultSearchPhrase) {
      defaultSearchPhrase = defaultQuery;
    }
  });

  return defaultSearchPhrase;
};

/**
 * Simplifies the process of syncing a debounced searchString with queryParameters
 * @queryNames an array of queryParameters to set using the debounced search phrase
 */
const useDebouncedSearchQueryParameter = ({ queryNames }: IConfig) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchPhrase, setSearchPhrase] = useState<string>(getDefaultSearchPhrase(queryNames, searchParams));
  const debouncedSearchPhrase = useDebounce(searchPhrase, 500);

  const handleSearchPhraseChange = (searchPhrase: string) => {
    const lowerCasePhrase = searchPhrase.toLowerCase();

    queryNames.forEach((param) => {
      searchParams.set(param, lowerCasePhrase);
    });
    setSearchParams(searchParams);
  };

  const handleRemovalOfSearchPhrase = () => {
    queryNames.forEach((param) => {
      searchParams.delete(param);
    });
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (debouncedSearchPhrase === null) {
      return;
    }

    if (debouncedSearchPhrase.length > 0) {
      handleSearchPhraseChange(debouncedSearchPhrase);
      return;
    }

    // If statement prevents unneccesary changes to searchParams
    if (queryNames.some((qn) => searchParams.has(qn))) {
      handleRemovalOfSearchPhrase();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchPhrase]);

  return {
    searchPhrase,
    setSearchPhrase,
  };
};

export default useDebouncedSearchQueryParameter;
