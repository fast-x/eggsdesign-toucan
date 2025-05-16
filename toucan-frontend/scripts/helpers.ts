// TODO trim spaces at the end and beginning of words
import client from './sanity';

export const splitStringToArray = (longString: string) => {
  return longString.split(',').map((word) => word.trim());
};

export const formatDateString = (longDate: string) => {
  let dateFormat = new Date(longDate);
  return dateFormat.toLocaleDateString('en-EN', { month: 'long', day: 'numeric', year: 'numeric' });
};

export const generateSlug = (value: string) => {
  return value.toLowerCase().replace(/\s+/g, '-');
};

export const getDateDiff = (first: string, second: string) => {
  return Math.round((new Date(second).valueOf() - new Date(first).valueOf()) / (1000 * 60 * 60 * 24));
};

export const loginRedirectConfig = {
  props: { user: null, projects: null },
  redirect: {
    destination: '/signin', // TODO: Change this to '/log-in' when that page has been styled
    permanent: false,
  },
};

export function getFormattedName(email: string, userName?: string) {
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  try {
    const localPart = email.split('@')[0];
    const [first, last] = localPart.split('.');

    if (!first || !last) {
      throw new Error();
    }

    return {
      firstName: capitalize(first),
      lastName: capitalize(last),
    };
  } catch {
    if (!userName) {
      throw new Error('Cannot extract name from email and no fallback userName provided.');
    }

    const parts = userName.toLowerCase().split(' ');
    if (parts.length < 2) {
      throw new Error('Fallback userName format is invalid.');
    }

    const [last, first] = parts;

    return {
      firstName: capitalize(first),
      lastName: capitalize(last),
    };
  }
}
