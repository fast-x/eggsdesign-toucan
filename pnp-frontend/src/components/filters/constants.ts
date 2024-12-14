export const stringSearchValues = ['title', 'firstName', 'lastName'] as const;
export type STRING_SEARCH_VALUES = typeof stringSearchValues[number];

export const ignoredPropertiesForFilterInit = [
  '_id',
  '_type',
  'images',
  'clientId',
  'title',
  'employees',
  'image',
  'firstName',
  'lastName',
] as const;
export type IGNORE_PROPERTIES_FOR_FILTER_INIT = typeof ignoredPropertiesForFilterInit[number];
