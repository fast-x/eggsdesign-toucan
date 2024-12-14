import { any, curry } from 'ramda';
import { FilterType } from './components/filters/types';
import Employee from './types/Employee';
import Project from './types/Project';
import { LocaleString } from './types/Shared';

export const sum = (a: number, b: number): number => {
  return a + b;
};

const testSearchString = (value: string, filterValue: string): boolean => {
  return value.toLowerCase().includes(filterValue.toLowerCase());
};

const testForString = (selectedOptions: string[], val: unknown): boolean =>
  typeof val === 'string' && selectedOptions.includes(val);

const testForObjectNames = (selectedOptions: string[], val: { name?: string } | null): boolean =>
  typeof val?.name === 'string' && selectedOptions.includes(val.name);

const testForLocaleString = (selectedOptions: string[], val: { name: LocaleString } | null): boolean =>
  (val?.name?._type && val?.name?._type === 'localeString' && selectedOptions.includes(val?.name?.en ?? '')) ||
  selectedOptions.includes(val?.name?.nb ?? '');

const testArrayWith = <T>(val: T[], selOpts: string[], fn: (selOpts: string[], val: T) => boolean): boolean => {
  return any(curry(fn)(selOpts))(val);
};

const isProject = (value: Employee | Project): value is Project => value._type === 'project';
const isEmployee = (value: Employee | Project): value is Employee => value._type === 'employee';

/**
 * Used to check if the project or employee is set in the current filters
 */
export const testFilter = (filter: FilterType, testedObject: Employee | Project): boolean => {
  const testedProperty = testedObject[filter.filterName as keyof typeof testedObject];
  const selectedOptions = filter?.selectedOptions;
  const filterName = filter.filterName;
  if (!testedProperty || !selectedOptions?.length) {
    return false;
  }

  if (isProject(testedObject) && filterName === 'title') {
    return testSearchString(
      `${testedObject.client ?? ''} ${testedObject.title?.en ?? ''} ${testedObject.title?.nb ?? ''}`,
      selectedOptions[0],
    );
  }

  if (isEmployee(testedObject) && (filterName === 'firstName' || filterName === 'lastName')) {
    return testSearchString(`${testedObject.firstName ?? ''} ${testedObject.lastName ?? ''}`, selectedOptions[0]);
  }

  if (typeof testedProperty === 'string') {
    return selectedOptions.includes(testedProperty);
  }

  if (isEmployee(testedObject) && filterName === 'level') {
    return (
      selectedOptions.includes(testedObject?.level?.name?.nb ?? '') ||
      selectedOptions.includes(testedObject?.level?.name?.en ?? '')
    );
  }

  if (!Array.isArray(testedProperty)) {
    return false;
  }

  if (filterName === 'approaches') {
    return testArrayWith(testedObject[filterName] ?? [], selectedOptions, testForLocaleString);
  }

  if (filterName === 'competences') {
    return testArrayWith(testedObject[filterName] ?? [], selectedOptions, testForObjectNames);
  }

  if (isProject(testedObject) && filterName === 'domains') {
    return testArrayWith(testedObject[filterName] ?? [], selectedOptions, testForObjectNames);
  }

  if (isEmployee(testedObject) && filterName === 'offices') {
    return testArrayWith(testedObject[filterName] ?? [], selectedOptions, testForObjectNames);
  }

  return testArrayWith(testedProperty, selectedOptions, testForString);
};
