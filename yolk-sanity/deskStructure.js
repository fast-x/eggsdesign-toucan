import S from "@sanity/desk-tool/structure-builder";
import {
  MdAssessment,
  MdLanguage,
  MdBook,
  MdAssignmentInd,
  MdSettings,
  MdViewQuilt,
  MdSettingsApplications,
  MdWork,
  MdKeyboard,
  MdAccessibility,
} from "react-icons/md";

// Use this to build selections of document types, for easy referral in the structure builder further below
const sets = {
  web: [
    "jobListing",
    "story",
    "expertise",
    "career",
    "caseStudy",
    "storyCategory",
    "article",
  ],
  core: [
    "businessDomain",
    "office",
    "competences",
    "client",
    "awards",
    "level",
  ],
  toucan: ["toucanPost", "tagByUser"],
  handbooks: ["handbook", "handbookArticle"],
  resources: ["cardDeck", "phase"],
  pnp: ["employee", "project", "approach", "toucanPost"],
  dashboardConfiguration: ["dashboardConfiguration"],
};

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Core data")
        .icon(MdAssessment)
        .child(
          S.list()
            .title("Core data")
            .items([
              ...S.documentTypeListItems().filter((listItem) =>
                sets.core.includes(listItem.getId())
              ),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Yolk Dashboard")
        .icon(MdSettingsApplications)
        .child(
          S.editor()
            .title("Dashboard settings")
            .schemaType("dashboardConfiguration")
            .documentId("e23869af-004d-4ab6-9810-895702078920")
        ),
      S.listItem()
        .title("Toucan")
        .icon(MdAssessment)
        .child(
          S.list()
            .title("Toucan")
            .items([
              ...S.documentTypeListItems().filter((listItem) =>
                sets.toucan.includes(listItem.getId())
              ),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("EGGS Web")
        .icon(MdLanguage)
        .child(
          S.list()
            .title("EGGS Web")
            .items([
              S.listItem()
                .title("Settings")
                .icon(MdSettings)
                .child(
                  S.editor()
                    .title("Website settings")
                    .schemaType("siteConfiguration")
                    .documentId("bfc000f3-82e7-4136-aef2-a517c8ff8542")
                ),
              S.divider(),
              S.listItem()
                .title("Eggs Life")
                .icon(MdAssignmentInd)
                .child(
                  S.editor()
                    .title("EGGS Life")
                    .schemaType("eggsLife")
                    .documentId("eggsLife")
                ),
              S.listItem()
                .title("People")
                .icon(MdAccessibility)
                .child(
                  S.editor()
                    .title("People")
                    .schemaType("peopleMain")
                    .documentId("peopleMain")
                ),
              S.listItem()
                .title("Stories")
                .icon(MdKeyboard)
                .child(
                  S.editor()
                    .title("Stories")
                    .schemaType("storiesMain")
                    .documentId("storiesMain")
                ),
              S.listItem()
                .title("Work")
                .icon(MdWork)
                .child(
                  S.editor().title("Work").schemaType("work").documentId("work")
                ),
              ...S.documentTypeListItems().filter((listItem) =>
                sets.web.includes(listItem.getId())
              ),
            ])
        ),
      S.listItem()
        .title("Resources")
        .icon(MdViewQuilt)
        .child(
          S.list()
            .title("Resources")
            .items([
              ...S.documentTypeListItems().filter((listItem) =>
                sets.resources.includes(listItem.getId())
              ),
            ])
        ),
      S.listItem()
        .title("Handbooks")
        .icon(MdBook)
        .child(
          S.list()
            .title("Handbooks")
            .items([
              ...S.documentTypeListItems().filter((listItem) =>
                sets.handbooks.includes(listItem.getId())
              ),
            ])
        ),
      S.listItem()
        .title("People and Projects")
        .icon(MdAssignmentInd)
        .child(
          S.list()
            .title("People and Projects")
            .items([
              ...S.documentTypeListItems().filter((listItem) =>
                sets.pnp.includes(listItem.getId())
              ),
            ])
        ),
    ]);
