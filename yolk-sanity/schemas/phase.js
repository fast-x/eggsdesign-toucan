export default {
  title: "Phase",
  name: "phase",
  type: "document",
  fields: [
    {
      title: "Phase Title",
      name: "phaseTitle",
      type: "string",
    },
    {
      title: "Description",
      name: "description",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
  ],
};
