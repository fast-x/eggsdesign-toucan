const documentEditorConfig: { [key: string]: { hidden: string[]; readonly: string[] } } = {
  employee: {
    readonly: ['title'],
    hidden: ['_id', '_createdAt', '_rev', '_type', '_updatedAt', 'type'],
  },
  project: {
    readonly: [],
    hidden: ['_id', '_createdAt', '_rev', '_type', '_updatedAt'],
  },
};

/** Evaluate whether a field should be ignored based on `ignoreList` */
export function isHiddenField(field: string, documentType: string) {
  if (!documentEditorConfig[documentType]) return false;
  return documentEditorConfig[documentType]?.hidden.includes(field);
}

export function isReadonlyField(field: string, documentType: string): boolean {
  if (!documentEditorConfig[documentType]) return false;
  return documentEditorConfig[documentType]?.readonly.includes(field);
}
