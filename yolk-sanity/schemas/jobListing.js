import body from "./defaultArticleBody";

// noinspection JSUnusedGlobalSymbols
export default {
  title: "Job Listing",
  name: "jobListing",
  type: "document",
  fieldsets: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "related",
      title: "Related",
    },
  ],
  fields: [
    {
      title: "Priority",
      name: "priority",
      type: "number",
      fieldset: "content",
    },
    {
      title: "Name",
      name: "name",
      type: "string",
      fieldset: "content",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
      fieldset: "content",
    },
    {
      title: "Tagline",
      name: "tagline",
      type: "string",
      fieldset: "content",
    },
    {
      title: "Intro",
      name: "intro",
      type: "text",
      fieldset: "content",
    },
    {
      title: "Offices",
      name: "offices",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "office" }],
        },
      ],
      fieldset: "content",
    },
    {
      title: "Main Image",
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fieldset: "content",
    },
    body,
    {
      title: "Contacts",
      name: "contacts",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "employee" }],
        },
      ],
      fieldset: "content",
    },
    {
      title: "Application URL",
      name: "applicationUrl",
      type: "string",
    },
    {
      title: "Related documents",
      name: "relatedDocuments",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "story" }, { type: "caseStudy" }],
        },
      ],
      fieldset: "related",
    },
  ],
};
