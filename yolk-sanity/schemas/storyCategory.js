// noinspection JSUnusedGlobalSymbols
export default {
  title: "Story Category",
  name: "storyCategory",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
    },
  ],
};
