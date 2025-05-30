import sanityClient from '@sanity/client';

// const { NEXT_PUBLIC_SANITY_TOKEN, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_SANITY_PROJECT_ID } = process.env;

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
});

export default client;

export function sanityAssetUrl(value: { asset: { _ref: string } }, params: string): string {
  if (!value.asset?._ref?.split('-')) return '';

  const [, filename, size, filetype] = value.asset._ref.split('-');
  return `https://cdn.sanity.io/images/${process.env.SANITY_PROJECT_ID}/${process.env.SANITY_DATASET}/${filename}-${size}.${filetype}?${params}`;
}
