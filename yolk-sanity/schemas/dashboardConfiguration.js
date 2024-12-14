// noinspection JSUnusedGlobalSymbols
export default {
  title: "Yolk Dasboard Configuration",
  name: "dashboardConfiguration",
  type: "document",
  __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
  fields: [
    {
      title: "Feature flags",
      description:
        "Feature flags decide what features appear in the app. For example, if a feature has a lot of destructive bugs, we can pull access until it is fixed.",
      name: "featureFlags",
      type: "array",
      of: [
        {
          name: "featureFlag",
          type: "object",
          fields: [
            { name: "name", type: "string" },
            { name: "active", type: "boolean" },
          ],
          preview: {
            prepare(selection) {
              const { title, value } = selection;
              return { title, subtitle: `${value ? "Active" : "Disabled"}` };
            },
            select: {
              title: "name",
              value: "active",
            },
          },
        },
      ],
    },
  ],
};
