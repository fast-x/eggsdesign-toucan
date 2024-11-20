export default {
  title: "Super List",
  description: "Paal's favourite bullet list",
  name: "superList",
  type: "object",
  fields: [
    {
      title: "List items",
      name: "listItems",
      type: "array",
      of: [
        {
          type: "eggsListItem",
        },
      ],
    },
  ],
};
