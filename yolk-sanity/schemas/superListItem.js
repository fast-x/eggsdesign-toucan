export default {
  title: "EGGS List Item",
  description: "A special Paalified list item, with SVG icon",
  name: "eggsListItem",
  type: "object",
  fields: [
    {
      title: "Icon",
      description: "SVGs only - for now",
      name: "icon",
      type: "image",
    },
    {
      name: "heading",
      type: "string",
      title: "Heading",
    },
    {
      name: "text",
      type: "text",
      title: "Text",
    },
  ],
};
