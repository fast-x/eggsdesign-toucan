import { SanityDocument, TypedObject } from '@sanity/types';
import { Domain } from './Domain';
import Employee from './Employee';
import { Approach, Award, Competence, Image, LastUpdated, LocaleBlock, LocaleString, VisibilityLevel } from './Shared';

interface Link extends TypedObject {
  URL: string;
  name: string;
}

interface BaseProject extends SanityDocument {
  _type: 'project';
  approaches: Array<Approach | null>;
  awards: Array<Award | null>;
  client: string; // The API fetches this as a string; the name of the client
  clientId: string;
  competence: Partial<Competence>;
  competences: Partial<Competence>[];
  domains: Array<Domain | null>;
  employees: Array<Partial<
    TypedObject & { participant: Partial<Employee>; contribution: LocaleString; memberRole: string }
  > | null>;
  images: Partial<Image>[];
  lastUpdated: LastUpdated;
  links: Array<Partial<Link> | null>;
  title: LocaleString;

  isNonCompanyProject: boolean;
  description: LocaleBlock;
  longtext: LocaleBlock;
  visibility: VisibilityLevel;
  projectManager: Partial<Employee>;
  monetaryBudget: { amount: number; currency: string };
  hourBudget: number;
  startYear: number;
  endYear: number;
}

type Project = Partial<BaseProject>;

export type ProjectContribution = Partial<
  Project & { _key: string; employeeDescription: { contribution: LocaleBlock }; client: { name: string } }
>;

export default Project;
