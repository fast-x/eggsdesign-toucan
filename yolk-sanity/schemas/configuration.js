import body from "./defaultArticleBody";

// noinspection JSUnusedGlobalSymbols
export default {
  title: "Site Configuration",
  name: "siteConfiguration",
  type: "document",
  __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
  fieldsets: [
    {
      name: "hero",
      title: "Hero content",
    },
    {
      name: "site",
      title: "Site setup",
    },
    {
      name: "social",
      title: "Social media",
    },
    {
      name: "footer",
      title: "Footer",
    },
  ],
  fields: [
    {
      title: "Name",
      name: "heroName",
      type: "string",
      readOnly: true,
      hidden: true,
    },
    {
      title: "Hero Vimeo ID",
      name: "heroVimeoId",
      type: "string",
      fieldset: "hero",
      description: "Should look something like this: 283935031",
    },
    {
      title: "Hero text",
      name: "heroText",
      type: "string",
      fieldset: "hero",
    },
    {
      title: "Button text",
      name: "heroButtonText",
      type: "string",
      fieldset: "hero",
    },
    {
      title: "Button URL",
      name: "heroButtonUrl",
      type: "url",
      fieldset: "hero",
    },
    {
      title: "Frontpage Items",
      name: "frontpageItems",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            { type: "caseStudy" },
            { type: "story" },
            { type: "jobListing" },
            { type: "businessDomain" },
            { type: "competences" },
          ],
        },
      ],
    },
    {
      title: "Name",
      name: "name",
      type: "string",
      readOnly: true,
      hidden: true,
    },
    {
      title: "Facebook",
      name: "facebookLink",
      type: "url",
      fieldset: "social",
    },
    {
      title: "Twitter",
      name: "twitterLink",
      type: "url",
      fieldset: "social",
    },
    {
      title: "LinkedIn",
      name: "linkedInLink",
      type: "url",
      fieldset: "social",
    },
    {
      title: "Instagram",
      name: "instagramLink",
      type: "url",
      fieldset: "social",
    },
    {
      title: "Vimeo",
      name: "vimeoLink",
      type: "url",
      fieldset: "social",
    },
    {
      title: "Medium",
      name: "mediumLink",
      type: "url",
      fieldset: "social",
    },
    {
      name: "content",
      title: "Content",
      fieldset: "footer",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
  ],
};
