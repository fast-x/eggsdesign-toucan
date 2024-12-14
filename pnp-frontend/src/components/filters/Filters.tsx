import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Employee from '../../types/Employee';
import Project from '../../types/Project';
import useTranslation from '../../utils/i18n/useTranslation';
import { getOptionsByDefaultValue, urlSearchParamsToFilters } from './helpers';
import useAvailableFilters from './hooks/useAvailableFilters';
import useDebouncedSearchQueryParameter from './hooks/useDebouncedSearchQueryParameter';
import useFilterSearchQueryParameters from './hooks/useFilterSearchQueryParameters';
import MultiSelectFilter from './MultiSelectFilter';
import SearchFilter, { SEARCH_TRANSLATIONS } from './SearchFilter';
import { FilterType } from './types';

type Props = {
  data: Project[] | Employee[];
  usage: 'projects' | 'people';
};

/**
 * This component holds its own state and uses URLSearchParams to
 */
const Filters: React.FC<Props> = ({ data, usage }) => {
  const { localeString } = useTranslation();
  const [searchParams] = useSearchParams();
  const [defaultOptions] = useState<FilterType[]>(urlSearchParamsToFilters(searchParams));
  const filterTypes = useAvailableFilters(data);
  const { handleChange } = useFilterSearchQueryParameters();
  const { searchPhrase, setSearchPhrase } = useDebouncedSearchQueryParameter({
    queryNames: usage === 'projects' ? ['title'] : ['firstName', 'lastName'],
  });

  if (!filterTypes.length || !data) {
    return null;
  }

  return (
    <>
      <SearchFilter
        placeholder={localeString(SEARCH_TRANSLATIONS[`${usage}Search`])}
        value={searchPhrase}
        onChange={(e) => setSearchPhrase(e.target.value)}
      />
      {filterTypes
        .filter((filter) => filter.filterOptions)
        .map((filter) => (
          <MultiSelectFilter
            key={filter.filterName}
            onChange={handleChange}
            filter={filter}
            defaultValue={getOptionsByDefaultValue(defaultOptions, filter.filterName)}
          />
        ))}
    </>
  );
};

export default Filters;
