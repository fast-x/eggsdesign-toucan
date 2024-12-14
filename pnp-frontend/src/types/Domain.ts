import { Reference, File } from '@sanity/types';
import { BaseDocumentSchema, Slug } from './Shared';
import { Block } from '@sanity/types/dist/dts';

interface IDomain extends BaseDocumentSchema {
  body: Array<Block>;
  contact: Reference;
  contacts: Reference[];
  icon: File & {
    _type: 'image';
  };
  iconSvg: string;
  intro: string;
  mainImage: File & {
    _type: 'image';
  };
  name: string;
  relatedCaseStudies: Reference[];
  slug: Slug;
  tagline: string;
}

export type Domain = Partial<IDomain>;
