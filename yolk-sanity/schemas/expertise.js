import body from "./defaultArticleBody";
import superList from "./superList";

// noinspection JSUnusedGlobalSymbols
export default {
  title: "Expertise",
  name: "expertise",
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
      validation: (Rule) => Rule.required(),
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
      description:
        "Needs to be entered, even if there is a Vimeo video in the hero. This image will be used for SEO/SoMe purposes.",
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
      name: "contentExpertise",
      title: "Areas of expertise text",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "H2", value: "h2" }],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
      ],
    },
    {
      name: "contentCompetences",
      title: "Our competences text",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "H2", value: "h2" }],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
      ],
    },
    {
      name: "contentCollaboration",
      title: "Collaboration text",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "H2", value: "h2" }],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
        superList,
      ],
    },
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
  ],
  preview: {
    select: {
      name: "name",
      image: "mainImage",
      client: "clients.0.name",
      contactFirst: "contacts.0.firstName",
      contactLast: "contacts.0.lastName",
    },
    prepare(selection) {
      const { name, image, client, contactFirst, contactLast } = selection;
      return {
        title: name,
        subtitle: client,
        description: contactFirst + " " + contactLast,
        media: image,
      };
    },
  },
};
