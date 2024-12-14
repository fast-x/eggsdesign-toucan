import video from "./video";
import superList from "./superList";
import quote from "./quote";
import stories from "./stories";
import faq from "./faq";
import anchor from "./anchor";

export default {
  title: "Body",
  name: "body",
  type: "array",
  fieldset: "content",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" },
        { title: "QuoteSource", value: "cite" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
      },
    },
    {
      title: "Image",
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "figcaption",
          type: "string",
          title: "Image Caption",
          options: {
            isHighlighted: true,
          },
        },
        {
          name: "size",
          type: "string",
          title: "Image width in article",
          options: {
            list: [
              { title: "Normal", value: "normal" },
              { title: "Large", value: "xl" },
            ],
            layout: "radio",
            isHighlighted: true,
          },
        },
      ],
    },
    video,
    superList,
    quote,
    stories,
    faq,
    anchor,
  ],
};
