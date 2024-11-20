export default {
  title: "Handbook",
  name: "handbook",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "localeString",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title.en",
      },
    },
    {
      title: "Description",
      name: "description",
      type: "localeString",
    },
    {
      title: "Articles",
      name: "articles",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "handbookArticle" }],
        },
      ],
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
  ],
  preview: {
    select: {
      title: "title.en",
    },
  },
};
