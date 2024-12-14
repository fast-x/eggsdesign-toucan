import React, { ChangeEventHandler } from 'react';
import LocaleString from '../LocaleString';
import FilterWrapper from './FilterWrapper';

export const SEARCH_TRANSLATIONS = {
  label: {
    en: 'Search',
    nb: 'Søk',
  },
  projectsSearch: {
    en: 'Search project',
    nb: 'Søk prosjekt',
  },
  peopleSearch: {
    en: 'Search person',
    nb: 'Søk person',
  },
};

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const SearchFilter: React.FC<Props> = ({ placeholder, value, onChange }) => (
  <FilterWrapper role="search" isSearchFilter>
    <span className="label-text">
      <LocaleString {...SEARCH_TRANSLATIONS.label} />
    </span>
    <input className="search-input" placeholder={placeholder} onChange={onChange} value={value} />
  </FilterWrapper>
);

export default SearchFilter;
