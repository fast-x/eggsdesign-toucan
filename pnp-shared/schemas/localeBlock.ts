import supportedLanguages from "./supportedLanguages";

export default {
  name: "localeBlock",
  type: "object",
  title: "Multi-line text field with support for multiple languages",
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true },
    },
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: "array",
    of: [{ type: "block" }],
    fieldset: lang.isDefault ? null : "translations",
  })),
};
