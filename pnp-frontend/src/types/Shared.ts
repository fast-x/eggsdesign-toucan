import { BlockDefinition as Block } from '@sanity/types';
import Employee from './Employee';

export type Competence = {
  _key: string;
  _id: string;
  name: string;
};

export type LocaleBlock = {
  _type: 'localeBlock';
  en?: Array<Block>;
  nb?: Array<Block>;
};

export interface Color {
  _type: string;
  background: string;
  foreground: string;
  population: number;
  title: string;
}

export interface Image {
  _id: string;
  _key: string;
  asset: ImageAsset;
  color: Partial<Color>;
  credits: string;
  type: string;
  url: string;
}

export type LastUpdated = {
  username: string; // email address
  timestamp: string | number;
};

export interface BaseDocumentSchema {
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  _createdAt: string;
}

export interface Reference {
  _ref: string;
  _type: 'reference';
}

export interface ImageAsset {
  _type: 'image';
  asset: Reference;
  extension?: string;
}

export interface Slug {
  _type: 'slug';
  current: string;
}

export interface Client extends BaseDocumentSchema {
  name: string;
  slug: Slug;
  clientDJ?: Reference & {
    _id: string;
    firstName: string;
  };
  logo?: ImageAsset;
}

export type Award = BaseDocumentSchema & {
  name?: string;
  image?: {
    url?: string;
  };
};

export type Approach = BaseDocumentSchema & {
  name: LocaleString;
  competence: {
    _id: string;
    name: string;
  }[];
  images: {
    url: string;
    color: {
      background: string;
      foreground: string;
    };
  }[];
  gotoPerson: Employee;
  ingress: LocaleBlock;
  description: LocaleBlock;
};

export type DocumentSchema = {
  type: 'object' | 'document';
  fields: FieldSchema[];
  name: string;
};

export interface Field<T, T2> {
  fieldSchema: T;
  passedValue: T2;
  handleUpdate: (value: any) => void;
  documentType: string;
}

export interface BaseFieldSchema {
  type: string;
  editable?: boolean;
}

export type BooleanFieldSchema = {
  type: 'boolean';
  value: boolean;
  name: string;
  title: string;
  description: string;
} & BaseFieldSchema;

export type StringFieldSchema = {
  type: 'string';
  value: string;
  name: string;
  title: string;
  description: string;
  options?: {
    list?: string[];
  };
} & BaseFieldSchema;

export type NumberFieldSchema = {
  type: 'number';
  value: number;
  name: string;
  title: string;
  description: string;
} & BaseFieldSchema;

export type DateFieldSchema = {
  type: 'date';
  value: number;
  name: string;
  title: string;
  description: string;
  options: {
    dateFormat: string;
  };
} & BaseFieldSchema;

export type LocaleBlockFieldSchema = {
  type: 'localeBlock';
  name: string;
  title: string;
  description: string;
} & BaseFieldSchema;

export type LocaleStringFieldSchema = {
  type: 'localeString';
  title: string;
  name: string;
  description?: string;
} & BaseFieldSchema;

export type ArrayFieldSchema = {
  type: 'array';
  title: string;
  description: string;
  of: FieldSchema[];
  name: string;
} & BaseFieldSchema;

export type ObjectFieldSchema = {
  type: 'object';
  title: string;
  description: string;
  fields: FieldSchema[];
  name: string;
} & BaseFieldSchema;

export type ReferenceFieldSchema = {
  type: 'reference';
  title: string;
  description: string;
  name: string;
  to: { type: string }[];
} & BaseFieldSchema;

export type ImageFieldSchema = {
  type: 'image';
  title: string;
  description: string;
  name: string;
  asset: any;
  fields: FieldSchema[];
} & BaseFieldSchema;

export type ArrayElement = {
  _key: string;
};

export type FieldSchema =
  | BooleanFieldSchema
  | StringFieldSchema
  | NumberFieldSchema
  | DateFieldSchema
  | LocaleBlockFieldSchema
  | LocaleStringFieldSchema
  | ArrayFieldSchema
  | ObjectFieldSchema
  | ReferenceFieldSchema
  | ImageFieldSchema;

export type PassedValue = string | number | PassedImageValue | PassedArrayValue | PassedObjectValue;

export type PassedArrayValue = (PassedValue & ArrayElement)[];

export type PassedBooleanValue = {
  _type: 'boolean';
};

export type PassedImageValue = {
  _type: 'image';
  asset: {
    _ref: string;
  };
  credits: string;
  [key: string]: any;
};

export type PassedReferenceValue = {
  _type: 'reference';
  _ref: string;
  [key: string]: any;
};

export type PassedLocaleStringValue = {
  _type: 'localeString';
  en: string;
  nb: string;
  [key: string]: any;
};

export type PassedLocaleBlockValue = {
  _type: 'localeBlock';
  en: any[];
  nb: any[];
  [key: string]: any;
};

export type PassedObjectValue = {
  _type: 'object';
  name: string;
  fields: PassedValue[];
  [key: string]: any;
};

export type LocaleString = {
  _type: 'localeString';
  _key: string;
  en: string;
  nb: string;
  [key: string]: any;
};

export type Languages = {
  en: Language;
  nb: Language;
};

export type Language = 'en' | 'nb';

export interface LanguageContext {
  currentLanguage: Language;
  setCurrentLanguage?: (language: Language) => void;
  availableLanguages: Languages;
}

export type VisibilityLevel = 'open' | 'internal-only' | 'top-secret';

export type FieldValueType = {
  name?: LocaleString | string;
};
