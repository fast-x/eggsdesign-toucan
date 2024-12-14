export default {
  title: "Handbook article",
  name: "handbookArticle",
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
      title: "Related articles",
      name: "relatedArticles",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "handbookArticle" }],
        },
      ],
    },
    {
      title: "Article content",
      name: "content",
      type: "array",
      of: [{ type: "localeBlock" }, { type: "image" }],
    },
  ],
  preview: {
    select: {
      title: "title.en",
    },
  },
};
