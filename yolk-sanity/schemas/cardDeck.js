export default {
  title: "Card Deck",
  name: "cardDeck",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
    },
    {
      name: "cards",
      type: "array",
      of: [{ type: "card" }],
    },
  ],
};
