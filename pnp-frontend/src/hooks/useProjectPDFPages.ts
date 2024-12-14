import { Block } from '@sanity/types/dist/dts';
import * as R from 'ramda';
import { useContext, useState, useMemo } from 'react';
import LanguageContext from '../contexts/LanguageContext';
import Project from '../types/Project';
import { Image, Language } from '../types/Shared';

export interface DetailsPageSettings {
  heroSlide: boolean;
  longForm: boolean;
  details: boolean;
  clientName: boolean;
  reference: boolean;
  referenceValue: string;
  period: boolean;
  budget: boolean;
  domain: boolean;
  approaches: boolean;
  awards: boolean;
  team: boolean;
}

export interface ProjectLongPDFPage {
  type: 'content' | 'team' | 'details' | 'hero';
  images: Array<Partial<Image> | null>;
  blocks: Array<Block & { hidden?: boolean }>;
}

const addNewPageWithBlock = (pages: ProjectLongPDFPage[], block: Block): ProjectLongPDFPage[] => {
  return [
    ...pages,
    {
      type: 'content',
      images: [],
      blocks: [block],
    },
  ];
};

const addInitialDetailsPage = (accumulator: ProjectLongPDFPage[]): ProjectLongPDFPage[] => {
  return [
    ...accumulator,
    {
      type: 'details',
      images: [],
      blocks: [],
    },
  ];
};

const addLongFormPages =
  (currentLanguage: Language, project: Project) =>
  (accumulator: ProjectLongPDFPage[]): ProjectLongPDFPage[] =>
    project.longtext?.[currentLanguage]?.reduce<ProjectLongPDFPage[]>((accu, block, index) => {
      if (
        index === 0 ||
        (block as unknown as Block).style === 'h1' ||
        (block as unknown as Block).style === 'h2' ||
        (block as unknown as Block).style === 'h3'
      ) {
        return addNewPageWithBlock(accu, block as unknown as Block);
      }

      // The following code appends a block to the following path of the accumulator:
      //      - 'accu[lastIndex].blocks'
      //  without mutating the original variable
      return R.over(R.lensPath([R.length(accu) - 1, 'blocks']), R.append(block as unknown as Block), accu);
    }, accumulator) ?? accumulator;

const addTeamPage = (accumulator: ProjectLongPDFPage[]): ProjectLongPDFPage[] => [
  ...accumulator,
  {
    type: 'team',
    images: [],
    blocks: [],
  },
];

const addHeroPage =
  (image: Partial<Image> | null) =>
  (accumulator: ProjectLongPDFPage[]): ProjectLongPDFPage[] => {
    return [
      ...accumulator,
      {
        type: 'hero',
        images: [image],
        blocks: [],
      },
    ];
  };

/**
 * This function ensures that we add two pictures per page as long as we have enough pictures
 *
 * It will prioritise having at least one picture on as many pages as possible over having two pictures on a single page
 */
const addImagesToPages =
  (images: Partial<Image>[]) =>
  (accumulator: ProjectLongPDFPage[]): ProjectLongPDFPage[] => {
    const filteredImages = images.filter((image) => image.url && !image.url.endsWith('.gif'));
    const numImages = filteredImages.length;
    const numPages = accumulator.length;
    const imagesPerPage = numImages >= numPages * 3 ? 3 : 2; // 3/page if we have sufficent images
    const modulusIndex = numImages % numPages; // We use modulus to put 2/page for as long as we have a supply

    return accumulator.map((page, index) => {
      // With 3 images per page we have sufficient images so we just render 3/page
      if (imagesPerPage === 3) {
        const startIndex = index * imagesPerPage;
        const endIndex = startIndex + imagesPerPage;
        const pageImages = filteredImages.slice(startIndex, endIndex).map((image) => image || null);

        return {
          ...page,
          images: pageImages,
        };
      }

      // We render one image when we don't have sufficent
      if (numImages <= numPages) {
        return {
          ...page,
          images: [images?.[index] ?? null],
        };
      }

      // We render 2 images as long as we have sufficent images
      if (numImages >= numPages * 2 || modulusIndex > index) {
        const chunkIndex = index * 2;

        return {
          ...page,
          images: [images?.[chunkIndex] ?? null, images?.[chunkIndex + 1] ?? null],
        };
      }

      const derivedIndex = index + modulusIndex;

      // We render 1 image starting from when we've only have enough images for one (modulus)
      return {
        ...page,
        images: [images?.[derivedIndex] ?? null],
      };
    });
  };

const settingIsSelected = (settingState: boolean) => () => settingState;

const useProjectPDFPages = (project: Project) => {
  const { currentLanguage } = useContext(LanguageContext);
  const [settings, setSettings] = useState<DetailsPageSettings>({
    heroSlide: false,
    longForm: false,
    details: false,
    clientName: true,
    reference: false,
    referenceValue: '',
    period: true,
    budget: true,
    domain: true,
    approaches: true,
    awards: true,
    team: false,
  });
  const pages = useMemo<ProjectLongPDFPage[]>(() => {
    return R.pipe(
      R.when(settingIsSelected(settings.heroSlide), addHeroPage(project && project.images ? project.images[0] : null)),
      R.when(settingIsSelected(settings.details), addInitialDetailsPage),
      R.when(settingIsSelected(settings.longForm), addLongFormPages(currentLanguage, project)),
      R.when(settingIsSelected(settings.team), addTeamPage),
      addImagesToPages(project.images && project.images.length ? project.images.slice(1) : []), // We slice the first image because the first image is used for the frontpages
    )([]);
  }, [project, settings, currentLanguage]);

  return {
    pages,
    settings,
    setSettings,
  };
};

export default useProjectPDFPages;
