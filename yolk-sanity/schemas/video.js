// noinspection JSUnusedGlobalSymbols
export default {
  title: "Video",
  description: "Vimeo and YouTube video",
  name: "video",
  type: "object",
  fields: [
    {
      title: "Url",
      name: "url",
      type: "url",
    },
    {
      name: "videocaption",
      type: "string",
      title: "Video Caption",
    },
  ],
};
