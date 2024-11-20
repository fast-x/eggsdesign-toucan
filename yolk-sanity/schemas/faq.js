export default {
  name: "faq",
  title: "FAQ",
  description: "A question with an answer",
  type: "object",
  fields: [
    {
      name: "faqQuestion",
      title: "Question",
      type: "string",
    },
    {
      name: "faqAnswer",
      title: "Answer",
      type: "text",
    },
  ],
  preview: {
    select: {
      text: "faqQuestion",
    },
    prepare(value) {
      return {
        title: value.text,
      };
    },
  },
};
