import body from "./defaultArticleBody";

// noinspection JSUnusedGlobalSymbols
export default {
  title: "Competence",
  name: "competences",
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
      title: "Priority",
      name: "priority",
      type: "number",
      fieldset: "content",
    },
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
      title: "Intro",
      name: "intro",
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
    {
      title: "Icon",
      name: "icon",
      type: "image",
      description: "SVG Icon",
      fieldset: "content",
    },
    {
      title: "Icon markup",
      name: "iconSvg",
      type: "text",
      description: "Paste markup for SVG icon",
      fieldset: "content",
    },
    {
      title: "Contact",
      name: "contact",
      type: "reference",
      to: [{ type: "employee" }],
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
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
      firstName: "contact.firstName",
      lastName: "contact.lastName",
      media: "mainImage",
    },
    prepare(selection) {
      const { title, subtitle, firstName, lastName, media } = selection;
      return {
        title: title,
        subtitle: subtitle,
        description: firstName + " " + lastName,
        media: media,
      };
    },
  },
};
