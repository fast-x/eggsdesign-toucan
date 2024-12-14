// noinspection JSUnusedGlobalSymbols
export default {
  title: "Client",
  name: "client",
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
    {
      name: "logo",
      type: "image",
    },
    {
      name: "clientDJ",
      type: "reference",
      to: [{ type: "employee" }],
    },
  ],
};
