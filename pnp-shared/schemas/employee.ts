export default {
  title: "Employee",
  name: "employee",
  type: "document",
  fields: [
    {
      title: "Image",
      name: "image",
      type: "image",
      validation: (Rule: any) => Rule.required(),
      options: {
        hotspot: true,
      },
    },
    {
      title: "First name",
      name: "firstName",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: "Last name",
      name: "lastName",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: "About",
      description:
        "A few descriptive sentences about what makes this person interesting and fun in projects",
      name: "description",
      type: "localeBlock",
    },
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: "Level",
      name: "level",
      type: "reference",
      to: [{ type: "level" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: "Competences",
      name: "competences",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "competences" }],
        },
      ],
    },
    {
      title: "Role(s)",
      name: "roles",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      title: "Email",
      name: "email",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: "Telephone",
      name: "telephone",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: "Type",
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Employee", value: "employee" },
          { title: "Freelancer", value: "freelancer" },
          { title: "Associate", value: "associate" },
          { title: "Alumni", value: "alumni" },
        ],
        layout: "radio",
      },
    },
    {
      title: "Offices",
      name: "offices",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "office" }],
        },
      ],
    },
    {
      name: "skills",
      title: "Personal Skills",
      description:
        'These "unofficial" skills are defined and added by the employees',
      type: "array",
      of: [{ type: "localeString" }],
    },
    {
      name: "approaches",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "approach" }],
        },
      ],
    },

    {
      name: "education",
      type: "array",
      of: [
        {
          type: "object",
          name: "educationEntry",
          fields: [
            {
              name: "startDate",
              type: "date",
              options: {
                dateFormat: "YYYY-MM",
              },
            },
            {
              name: "endDate",
              type: "date",
              options: {
                dateFormat: "YYYY-MM",
              },
            },
            {
              name: "place",
              type: "string",
            },
            {
              name: "degree",
              type: "string",
            },
            {
              name: "description",
              type: "localeString",
            },
          ],
        },
      ],
    },
    {
      name: "workHistory",
      type: "array",
      of: [
        {
          type: "object",
          name: "workHistoryEntry",
          fields: [
            {
              name: "startDate",
              type: "date",
              options: {
                dateFormat: "YYYY-MM",
              },
            },
            {
              name: "endDate",
              type: "date",
              options: {
                dateFormat: "YYYY-MM",
              },
            },
            {
              name: "place",
              type: "string",
            },
            {
              name: "role",
              type: "string",
            },
            {
              name: "description",
              type: "localeString",
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      first: "firstName",
      last: "lastName",
      email: "email",
      title: "title",
      image: "image",
      type: "type",
      office: "offices.0.name",
    },
    prepare(selection: any) {
      const { first, last, email, title, image, office } = selection;
      return {
        title: `${first} ${last}`, // Had issues with extracting the `type` field, only resolves to "undefined"
        subtitle: `${office} | ${title}`,
        description: email,
        media: image,
      };
    },
  },
  orderings: [
    {
      title: "First Name (asc)",
      name: "lastNameAsc",
      by: [{ field: "firstName", direction: "asc" }],
    },
    {
      title: "First Name (desc)",
      name: "lastNameDesc",
      by: [{ field: "firstName", direction: "desc" }],
    },
  ],
};
