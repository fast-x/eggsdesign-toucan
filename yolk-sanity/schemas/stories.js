export default {
  name: "stories",
  title: "Stories",
  description: "Choose some stories",
  type: "object",
  fields: [
    {
      title: "Related Stories",
      name: "relatedStories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "story",
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      name: "name",
    },
    prepare(selection) {
      const { name } = selection;
      return {
        name: name,
      };
    },
  },
};
