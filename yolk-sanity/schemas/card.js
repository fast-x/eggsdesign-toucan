export default {
  title: "Card",
  name: "card",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Subtitle",
      name: "subtitle",
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
    {
      title: "Image",
      name: "image",
      type: "image",
    },
    {
      title: "Phase",
      name: "phase",
      type: "reference",
      to: [
        {
          type: "phase",
        },
      ],
    },
    {
      title: "Instruction",
      name: "instruction",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
  ],
};
