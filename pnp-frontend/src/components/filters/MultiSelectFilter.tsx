import React from 'react';
import { ActionMeta, StylesConfig, GroupBase } from 'react-select';
import Select from 'react-select';
import { colors } from '../styles';
import FilterWrapper from './FilterWrapper';
import { FilterType, MultiSelectOption } from './types';

type Props = {
  filter: FilterType;
  defaultValue: MultiSelectOption[];
  onChange: (name: string, option: readonly MultiSelectOption[], actionMeta: ActionMeta<MultiSelectOption>) => void;
};

const mapOptions = (filter: FilterType): MultiSelectOption[] =>
  filter.filterOptions
    ?.sort((a, b) => a.localeCompare(b))
    .map((opt): MultiSelectOption => ({ value: opt, label: opt })) ?? [];

const MultiSelectFilter: React.FC<Props> = ({ filter, defaultValue, onChange }) => (
  <FilterWrapper key={filter.filterName}>
    <span className="label-text">{filter.filterName}</span>
    <Select
      isMulti
      onChange={(option: readonly MultiSelectOption[], actionMeta: ActionMeta<MultiSelectOption>) =>
        onChange(filter.filterName, option, actionMeta)
      }
      options={mapOptions(filter)}
      defaultValue={defaultValue}
      placeholder="All"
      className="filter-select"
      styles={selectStyles}
    />
  </FilterWrapper>
);

export default MultiSelectFilter;

const selectStyles: StylesConfig<MultiSelectOption, boolean, GroupBase<MultiSelectOption>> = {
  valueContainer: (provided) => ({
    ...provided,
    display: 'flex',
  }),
  control: (provided) => ({
    ...provided,
    borderColor: colors.primary.white,
    color: colors.primary.black,
    borderRadius: '9999px',
    textIndent: '10px',
    minHeight: '3em',
    paddingRight: '8px',
    cursor: 'pointer',
    justifyContent: 'flex-start',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#000',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  placeholder: () => ({
    color: colors.primary.black,
    fontSize: '1em',
  }),
  multiValue: (provided) => ({
    ...provided,
    borderRadius: '12px',
  }),
};
