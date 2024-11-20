export default {
  title: "Office",
  name: "office",
  type: "document",
  fieldsets: [
    {
      title: "Content",
      name: "content",
    },
    {
      title: "Contact Details",
      name: "contact",
    },
    {
      title: "Info Kiosk",
      name: "infoKiosk",
      options: {
        collapsible: true,
      },
    },
  ],
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
      fieldset: "content",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
    },
    {
      title: "Address",
      name: "address",
      type: "string",
      fieldset: "contact",
    },
    {
      title: "Zipcode",
      name: "zipCode",
      type: "string",
      fieldset: "contact",
    },
    {
      title: "City",
      name: "city",
      type: "string",
      fieldset: "contact",
    },
    {
      title: "Country",
      name: "country",
      type: "string",
      fieldset: "contact",
    },
    {
      title: "Telephone",
      name: "telephone",
      type: "string",
      fieldset: "contact",
    },
    {
      title: "Email",
      name: "email",
      type: "string",
      fieldset: "contact",
    },
    {
      title: "Map URL",
      name: "mapUrl",
      type: "string",
      fieldset: "contact",
    },
    {
      name: "kioskInterval",
      type: "number",
      fieldset: "infoKiosk",
    },
    {
      name: "urls",
      type: "array",
      of: [{ type: "string" }],
      fieldset: "infoKiosk",
    },
  ],
};
