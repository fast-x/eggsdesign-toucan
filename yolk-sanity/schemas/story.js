import body from "./defaultArticleBody";

// noinspection JSUnusedGlobalSymbols
export default {
  title: "Story",
  name: "story",
  type: "document",
  fieldsets: [
    {
      name: "meta",
      title: "Meta Information",
      options: { collapsible: true },
    },
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
      title: "Meta Title",
      name: "metaTitle",
      type: "string",
      fieldset: "meta",
    },
    {
      title: "Meta Description",
      name: "metaDescription",
      type: "string",
      fieldset: "meta",
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
      title: "Ingress",
      name: "ingress",
      type: "text",
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
    {
      title: "Hero Vimeo ID",
      name: "heroVimeoId",
      type: "string",
      fieldset: "content",
      description:
        "Will replace image if entered. Should look something like this: 283935031",
    },
    body,
    {
      title: "Categories",
      name: "categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "storyCategory" }],
        },
      ],
      fieldset: "content",
    },
    {
      title: "Authors",
      name: "authors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "employee" }],
        },
      ],
      fieldset: "related",
    },
    {
      title: "Domains",
      name: "domains",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "businessDomain" }],
        },
      ],
      fieldset: "related",
    },
    {
      title: "Related Case Studies",
      name: "relatedCaseStudies",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "caseStudy" }],
        },
      ],
      fieldset: "related",
    },
    {
      title: "Related Job Listings",
      name: "relatedJobListings",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "jobListing" }],
        },
      ],
      fieldset: "related",
    },
    {
      title: "Related Stories",
      name: "relatedStories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "story" }],
        },
      ],
      fieldset: "related",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "mainImage",
      a0f: "authors.0.firstName",
      a0l: "authors.0.lastName",
      category: "categories.0.name",
    },
    prepare(selection) {
      const { title, media, a0f, a0l, category } = selection;
      return {
        title,
        subtitle: a0f + " " + a0l,
        description: category,
        media,
      };
    },
  },
};
