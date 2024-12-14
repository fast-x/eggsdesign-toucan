export const sanityConfig: Props = {
  projectId: 'bxno5me3',
  dataset: (import.meta.env.VITE_SANITY_DATASET as string) || 'development',
};

type Props = {
  projectId: string;
  dataset: string;
};
