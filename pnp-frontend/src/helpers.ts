import { format, parseISO } from 'date-fns';
import { Language, LocaleString, FieldValueType } from './types/Shared';

export const localizeString = (value: LocaleString | string, language: Language): string => {
  if (typeof value === 'string') return value;
  return value?.[language] || 'No translation';
};

export const truncateString = (str: string, n: number) => (str.length > n ? `${str.slice(0, n - 1)}...` : str);

export const getFieldValue = (
  values: FieldValueType | FieldValueType[],
  currentLanguage: Language,
  returnAsArray = false,
): string | string[] => {
  if (Array.isArray(values)) {
    return values
      .filter((a) => a?.name !== undefined)
      .map((item) => {
        return localizeString(item.name as LocaleString, currentLanguage);
      });
  }

  const value = values?.name || values;
  return returnAsArray
    ? [localizeString(value as LocaleString, currentLanguage)]
    : localizeString(value as LocaleString, currentLanguage);
};

export function blocksToArray(blocks: any): string[] {
  if (!Array.isArray(blocks)) {
    return [];
  }

  return blocks.map((block: { children: { text: string }[] }) =>
    block.children
      ? block.children.reduce((acc2, child) => {
          return acc2 + child.text;
        }, '')
      : '',
  );
}

export function chunk<T>(array: T[], size: number): T[][] {
  const chunkedArray: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    chunkedArray.push(chunk);
  }
  return chunkedArray;
}

export const stringContainsOnlyNumbers = (str: string) => /^\d+$/.test(str);

export const parseTimestamp = (timestamp: string | number, timeformat: TimestampFormat): string => {
  try {
    if (typeof timestamp === 'number') {
      return format(timestamp, timeformat);
    }
    if (typeof timeformat === 'string' && stringContainsOnlyNumbers(timestamp)) {
      return format(Number(timestamp), timeformat);
    }
    return format(parseISO(timestamp), timeformat);
  } catch {
    return 'invalid time format';
  }
};

export type TimestampFormat = 'eee dd MMM yyyy H:mm' | 'dd MMM yyyy' | 'MMM yyyy' | 'yyyy';

export const shiftArrayItems = (arr: unknown[], fromIdx: number, toIdx: number): any[] => {
  const firstIndex = fromIdx > toIdx ? toIdx : fromIdx;
  const lastIndex = fromIdx > toIdx ? fromIdx : toIdx;

  /*
			SCENARIOS:
			Moves idx_6 to idx_14
			                             firstIdx lastIdx
			list = [ list_0_5, list_7_13, list_6, list_14, list_15_32 ]


			Moves idx_11 to idx_4
			                  lastIdx firstIdx 
			list = [ list_0_4, list_11, list_4, list_4_11, list_12_32 ]
	*/

  return fromIdx < toIdx
    ? [
        ...arr.slice(0, firstIndex),
        ...arr.slice(firstIndex + 1, lastIndex),
        arr[firstIndex],
        arr[lastIndex],
        ...arr.slice(lastIndex + 1),
      ]
    : [
        ...arr.slice(0, firstIndex),
        arr[lastIndex],
        arr[firstIndex],
        ...arr.slice(firstIndex + 1, lastIndex),
        ...arr.slice(lastIndex + 1),
      ];
};

export const splitStringInHalf = (text: string): string[] => {
  const separator = /\s|,\s|,\b/; // Define the natural separators (space, comma followed by space, or comma followed by a word boundary)
  const words = text.split(separator); // Split the string into an array of words using the separator

  const midIndex = Math.floor(words.length / 2); // Find the index closest to the middle of the array
  const firstHalf = words.slice(0, midIndex + 1).join(' '); // Join the words from the beginning up to the middle index
  const secondHalf = words.slice(midIndex + 1).join(' '); // Join the words from the middle index + 1 to the end

  return [firstHalf, secondHalf];
};
