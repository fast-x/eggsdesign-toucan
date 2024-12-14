export type FilterType = {
  filterName: string;
  filterOptions: string[] | null;
  selectedOptions?: string[] | null | undefined;
};

export interface MultiSelectOption {
  value: string;
  label: string;
}
