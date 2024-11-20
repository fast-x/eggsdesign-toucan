export default {
  title: "Project",
  name: "project",
  type: "document",
  fields: [
    {
      name: "title",
      type: "localeString",
    },
    {
      name: "isNonCompanyProject",
      title: "Non-EGGS Project",
      type: "boolean",
      description:
        "This field is for projects done by an employee outside of their EGGS employment",
    },
    {
      name: "visibility",
      type: "string",
      options: {
        list: ["open", "internal-only", "top-secret"],
      },
    },
    {
      name: "hourBudget",
      title: "Hour budget",
      type: "number",
    },
    {
      title: "Monetary budget",
      name: "monetaryBudget",
      description: "Monetary budget excl. VAT",
      type: "object",
      fields: [
        {
          name: "amount",
          type: "number",
        },
        {
          name: "currency",
          type: "string",
          options: {
            list: ["Not selected", "NOK", "DKK", "SEK", "EUR", "USD"],
          },
        },
      ],
    },
    {
      name: "startYear",
      type: "date",
      options: {
        dateFormat: "YYYY",
      },
    },
    {
      name: "endYear",
      type: "date",
      options: {
        dateFormat: "YYYY",
      },
    },
    {
      name: "client",
      type: "reference",
      to: [
        {
          type: "client",
        },
      ],
    },
    {
      name: "images",
      type: "array",
      of: [
        {
          type: "image",
          name: "image",
          fields: [
            {
              type: "string",
              name: "credits",
            },
          ],
        },
      ],
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
      name: "domains",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "businessDomain",
            },
          ],
        },
      ],
    },
    {
      name: "employees",
      description:
        "Add employees and a description of their role in the project",
      type: "array",
      of: [
        {
          type: "object",
          name: "participant",
          title: "Project member",
          fields: [
            {
              type: "reference",
              name: "participant",
              title: "Employee",
              to: [{ type: "employee" }],
            },
            {
              type: "string",
              name: "memberRole",
              title: "Member role",
              options: {
                list: ["member", "project-manager"],
              },
            },
            {
              type: "localeBlock",
              name: "contribution",
            },
          ],
          preview: {
            select: {
              name: "participant.firstName",
            },
            prepare(selection: { name: string }) {
              console.log(selection.name);
              return { title: selection.name };
            },
          },
        },
      ],
    },
    {
      name: "description",
      title: "Short description",
      description:
        "Short text about the project. A total of 500 characters in one or two paragraphs.",
      type: "localeBlock",
    },
    {
      name: "longtext",
      title: "Longtext",
      description: `Input long description. To end up with neat paragraphs in PDF export mark each paragraph with header by using #, ##, or ### before header text and blank line afterwards.
        
        Example:
        ## Process
        
        In this project we used standard design process that consisted of ....
        
        Suggested structure to use in project description:
        ## Background
        ## Process
        ## Outcome
        ## Impact
        `,
      type: "localeBlock",
    },
    {
      name: "links",
      type: "array",
      of: [
        {
          type: "object",
          name: "link",
          fields: [
            {
              type: "string",
              name: "name",
            },
            {
              type: "string",
              name: "URL",
            },
          ],
        },
      ],
    },
    {
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
      name: "awards",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "awards" }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      client: "client.name",
      image: "images.0.asset",
    },
    prepare(selection: any) {
      const { title, client, image } = selection;

      return {
        title: title.en || title.nb,
        subtitle: client,
        media: image,
      };
    },
  },
  orderings: [
    {
      title: "Name, A-Z",
      name: "nameAsc",
      by: [{ field: "title.en", direction: "asc" }],
    },
    {
      title: "Name, Z-A",
      name: "nameDesc",
      by: [{ field: "title.en", direction: "desc" }],
    },
  ],
};
