import createSchema from "part:@sanity/base/schema-creator";

import employee from "pnp-shared/schemas/employee";
import localeBlock from "pnp-shared/schemas/localeBlock";
import localeString from "pnp-shared/schemas/localeString";
import project from "pnp-shared/schemas/project";

import expertise from "./expertise";
import eggsLife from "./eggsLife";
import work from "./work";
import storiesMain from "./storiesMain";
import peopleMain from "./peopleMain";
import careers from "./careers";
import office from "./office";
import domain from "./domain";
import competences from "./competence";
import article from "./article";
import caseStudy from "./caseStudy";
import story from "./story";
import storyCategory from "./storyCategory";
import awards from "./awards";
import client from "./client";
import jobListing from "./jobListing";
import configuration from "./configuration";
import superListItem from "./superListItem";
import approach from "./approach";
import level from "./level";
import handbook from "./handbook";
import handbookArticle from "./handbookArticle";
import card from "./card";
import phase from "./phase";
import cardDeck from "./cardDeck";
import dashboardConfiguration from "./dashboardConfiguration";
import toucanPost from "./toucanPost";
import tagByUser from "./tagByUser";

// noinspection JSUnusedGlobalSymbols
export default createSchema({
  name: "eggs-web-content",
  types: [
    dashboardConfiguration,
    awards,
    approach,
    domain,
    careers,
    caseStudy,
    client,
    competences,
    eggsLife,
    work,
    storiesMain,
    peopleMain,
    expertise,
    employee,
    jobListing,
    office,
    configuration,
    article,
    story,
    storyCategory,
    superListItem,
    localeBlock,
    localeString,
    level,
    project,
    handbook,
    handbookArticle,
    card,
    cardDeck,
    phase,
    toucanPost,
    tagByUser,
  ],
});
