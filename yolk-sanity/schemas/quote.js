export default {
  name: "quote",
  title: "Quote",
  description: "A quote, with or without source.",
  type: "object",
  fields: [
    {
      name: "quoteText",
      title: "Quote text",
      type: "text",
      description: "What's been said.",
    },
    {
      name: "quoteSource",
      title: "Quote source",
      type: "string",
      description: "Who done said it.",
    },
  ],
  preview: {
    select: {
      text: "quoteText",
    },
    prepare(value) {
      return {
        title: value.text,
      };
    },
  },
};
