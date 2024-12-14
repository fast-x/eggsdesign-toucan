import { FilterType, MultiSelectOption } from './types';

export const getOptionsByDefaultValue = (filterArray: FilterType[], filterName: string): MultiSelectOption[] => {
  const filterType = filterArray.find((filter) => filter.filterName === filterName);
  if (!filterType) {
    return [];
  }

  return (
    filterType.selectedOptions?.map<MultiSelectOption>((option) => ({
      label: option,
      value: option,
    })) ?? []
  );
};

export const urlSearchParamsToFilters = (params: URLSearchParams): FilterType[] => {
  if (params.toString().length === 0) {
    return [];
  }
  let obj: { [key: string]: string[] } = {};
  params.forEach((value, key) => {
    if (obj[key]) {
      obj[key].push(value);
    } else {
      obj = {
        ...obj,
        [key]: [value],
      };
    }
  });
  return Object.entries(obj).map(([key, value]) => ({
    filterName: key,
    selectedOptions: value,
    filterOptions: [],
  }));
};
