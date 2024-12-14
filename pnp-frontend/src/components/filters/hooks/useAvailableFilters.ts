import { useContext, useMemo } from 'react';
import LanguageContext from '../../../contexts/LanguageContext';
import { getFieldValue } from '../../../helpers';
import Employee from '../../../types/Employee';
import Project from '../../../types/Project';
import { ignoredPropertiesForFilterInit, IGNORE_PROPERTIES_FOR_FILTER_INIT, stringSearchValues } from '../constants';
import { FilterType } from '../types';
import { FieldValueType, Language } from '../../../types/Shared';

const initializeAvailableFilters = (data: Project[] | Employee[], currentLanguage: Language): FilterType[] => {
  const filters: FilterType[] = stringSearchValues.map((val) => ({
    filterName: val,
    filterOptions: null,
    selectedOptions: null,
  }));

  data.forEach((document: Project | Employee) => {
    Object.keys(document).forEach((fieldName) => {
      if (
        ignoredPropertiesForFilterInit.includes(fieldName as IGNORE_PROPERTIES_FOR_FILTER_INIT) ||
        !(fieldName in document)
      ) {
        return;
      }

      const typeIndex = filters.findIndex((item) => item.filterName === fieldName);
      const fieldValue = getFieldValue(
        document[fieldName as keyof typeof document] as FieldValueType,
        currentLanguage,
        true,
      ) as string[];

      /**
       * This next line is a HACK, to fix (logical) error/flaw in filter generation;
       * not all fields are localised, which returns a string ("No translation", as opposed to null/undefined)
       * from the helper function "getFieldValue()" above - need to revisit
       */
      if (fieldValue[0] === 'No translation') {
        return;
      }

      // If no existing entry for current filterName
      if (typeIndex < 0) {
        filters.push({
          filterName: fieldName,
          filterOptions: fieldValue,
          selectedOptions: [],
        });
        return;
      }
      const unique = (value: string, index: number, self: string[]) => {
        return self.indexOf(value) === index;
      };

      const options: string[] = [
        ...(filters[typeIndex].filterOptions ?? []),
        ...getFieldValue(document[fieldName as keyof typeof document] as FieldValueType, currentLanguage, true),
      ];

      filters[typeIndex].filterOptions = options.filter(unique);
    });
  });

  return filters;
};

const useAvailableFilters = (data: Project[] | Employee[]): FilterType[] => {
  const { currentLanguage } = useContext(LanguageContext);

  return useMemo((): FilterType[] => initializeAvailableFilters(data, currentLanguage), [currentLanguage, data]);
};

export default useAvailableFilters;
