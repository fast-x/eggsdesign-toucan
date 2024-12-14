export default {
  name: "anchor",
  title: "Anchor",
  description: "A heading with an anchor",
  type: "object",
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
    },
    {
      name: "anchor",
      title: "Anchor text",
      type: "string",
    },
  ],
  preview: {
    select: {
      text: "Heading",
    },
    prepare(value) {
      return {
        title: value.text,
      };
    },
  },
};
