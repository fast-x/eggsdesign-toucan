export default {
  title: "Tag by user",
  name: "tagByUser",
  type: "document",
  fields: [
    {
      title: "Value",
      name: "value",
      type: "string",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "value",
      },
    },
  ],
};
