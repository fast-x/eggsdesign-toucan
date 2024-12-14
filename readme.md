# Yolk Dashboard

This is a monorepo containing some of our core homegrown software in EGGS. These projects were originally tracked in separate repos, but due to their level of inter-dependence, they have now been gathered here.

## Setup

1. Clone the repo to your machine
2. Create .env files form both the `pnp-frontend` and `pnp-server` projects, based on the .env.template files in each project folder respectively

**Note:** to operate on a different Sanity dataset you need to update .env values for both pnp-server and pnp-frontend.

## Development
This a monorepo utilizing [Turborepo](https://turborepo.org) that you can use to run the different packages from the root folder.

- Run all configured packages
```
yarn run dev
```
- Run only pnp-frontend and pnp-server
```
yarn run dev:pnp
```
- Filter packages with any turbo command [see docs](https://turborepo.org/docs/core-concepts/filtering#filter-by-workspace-name)
```
yarn run [command] --filter=[my-filter]
```

## The projects

### PnP Frontend aka "Yolk Dashboard"

Read more in the [readme.md](./pnp-frontend/readme.md)

### PnP Server aka "Yolk API"

Read more in the [readme.md](./pnp-server/readme.md)

### Yolk Sanity

This Sanity project is included because it and the PnP Frontend both use schema js files to generate editing interfaces. Instead of maintaining two sets of schemas separately, we just let both subscribe to the same `shared` schema files.

**Note:** the Yolk Sanity is also used for the EGGS website.

## Developer Guidelines

If you are reading this, it's an indication that you are considering to contribute with development – fantastic! These guidelines are written to give you a good starting point, and to make you productive in the project as quickly as possible. However, if you feel that the written documentation is not descriptive enough, please reach out to the other developers on the project for a one-on-one introduction.

### How we use GIT

1. Create a new branch for your feature. We name branches based on whether they are a `feature/` or a `bugfix/`
2. Make your changes. Use atomic commits. Be descriptive in Git messages; if you are unsure, follow the [7 rules of commit messages](https://chris.beams.io/posts/git-commit/)
3. Test that it works, and has no lint errors
4. Create a Pull Request, and await approval from other developers
5. Merge into master
