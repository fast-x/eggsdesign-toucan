import tagByUser from "./tagByUser";

export default {
  title: "Toucan Post",
  name: "toucanPost",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "employee" }],
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", name: "image" }],
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tagByUser" }] }],
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [
        {
          type: "object",
          name: "comment",
          fields: [
            {
              name: "text",
              type: "string",
            },
            {
              name: "author",
              title: "Author",
              type: "reference",
              to: [{ type: "employee" }],
            },
            {
              title: "Created",
              name: "createdAt",
              type: "datetime",
            },
          ],
        },
      ],
    },
  ],
};
