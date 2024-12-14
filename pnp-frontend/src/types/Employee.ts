import { SanityDocument } from '@sanity/types';
import { ProjectContribution } from './Project';
import { Approach, Competence, Image, LastUpdated, LocaleBlock, LocaleString } from './Shared';

interface Office {
  name: string;
}

interface Education {
  _key: string;
  _type: string;
  degree: string;
  description: LocaleString;
  endDate: string;
  place: string;
  startDate: string;
}

interface WorkHistory {
  _key: string;
  _type: string;
  description: LocaleString;
  endDate: string;
  place: string;
  role: string;
  startDate: string;
}

interface BaseEmployee extends SanityDocument {
  _type: 'employee';
  title: string;
  lastUpdated: LastUpdated;
  image: Partial<Image>;
  imageURL: string;
  level: {
    name: LocaleString;
  };
  skills: LocaleString[];
  approaches: Array<Approach | null>;
  description: LocaleBlock;
  projects: Array<ProjectContribution | null>;
  roles: string[];
  firstName: string;
  lastName: string;
  offices: Partial<Office>[];
  competences: Partial<Competence>[];
  education: Partial<Education>[];
  workHistory: Partial<WorkHistory>[];
  type: string;

  email: string;
  telephone: string;
}

type Employee = Partial<BaseEmployee>;

export default Employee;
