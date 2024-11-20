import body from "./defaultArticleBody";

// noinspection JSUnusedGlobalSymbols
export default {
  title: "People landing page",
  name: "peopleMain",
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
  ],
};
