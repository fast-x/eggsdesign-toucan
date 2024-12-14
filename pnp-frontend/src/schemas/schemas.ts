import Schema from '@sanity/schema';
import { project, employee, localeBlock } from 'pnp-shared';
import { DocumentSchema } from '../types/Shared';

// Start with compiling a schema we can work against
// Ideally this would be fetched from Sanity, so we don't have to keep two separate schemas in sync

export const compiledSchemas = Schema.compile({
  name: 'pnp',
  types: [project, employee, localeBlock],
});

export const schemas: { project: DocumentSchema; employee: DocumentSchema } = {
  project: project as DocumentSchema,
  employee: employee as DocumentSchema,
};
