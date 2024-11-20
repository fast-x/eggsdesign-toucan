export default {
  title: "Approach",
  name: "approach",
  type: "document",
  fields: [
    {
      name: "name",
      type: "localeString",
    },
    {
      name: "ingress",
      description:
        "A few sentences about this approach – note that this text might be shown publically as well.",
      type: "localeBlock",
    },
    {
      name: "description",
      type: "localeBlock",
    },
    {
      name: "images",
      type: "array",
      of: [
        {
          type: "image",
        },
      ],
    },
    {
      name: "gotoPerson",
      type: "reference",
      to: [{ type: "employee" }],
    },
    {
      name: "competence",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "competences" }],
        },
      ],
    },
  ],
  orderings: [
    {
      title: "A-Z",
      name: "atoz",
      by: [{ field: "name.en", direction: "asc" }],
    },
    {
      title: "Z-A",
      name: "ztoa",
      by: [{ field: "name.en", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      name: "name",
    },
    prepare(selection) {
      const { name } = selection;
      return {
        title: name.en || name.nb,
      };
    },
  },
};
