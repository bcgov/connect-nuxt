[![License](https://img.shields.io/badge/License-BSD%203%20Clause-blue.svg)](LICENSE)

# Connect Nuxt
Connect support in the Nuxt framework

This monorepo contains Nuxt packages for the Connect ecosystem. It is managed using [pnpm workspaces](https://pnpm.io/workspaces) and [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

## Development

**Prerequisites**
- [Node](https://nodejs.org/en) (version 22.16.x or higher)
- [pnpm](https://pnpm.io/) (version 10.x or higher)

**Setup**
Create a fork and local copy of this repo. Answer _Y_ to create a local clone.
```bash
gh repo fork bcgov/connect-nuxt
```

Change into the directory and install the packages.
```bash
pnpm install
```

Start the development environment.
```bash
# from monorepo root
pnpm --filter package-name dev 
or
# from package root
pnpm run dev
```

## Testing
Run Vitest in watch mode for unit tests
```bash
# from monorepo root
pnpm --filter package-name test
or
# from package root
pnpm test
```

Run Playwright e2e tests
**Note: Playwright e2e tests are written against the `.playground` directory to ensure smooth integration of our common features**

```bash
# from monorepo root
pnpm --filter package-name test:e2e
or
# from package root
pnpm test:e2e
```

## Workspace Structure
This repository is organized into two main directories:

- packages/: Contains all the reusable, versioned, and publishable libraries. These are the shared building blocks of our system.
  - layers/
    - [base](./packages/layers/base/README.md): Foundational UI components, theme, and styles.
    - [auth](./packages/layers/auth/README.md): Authentication provider integration, composables, components and accounts.
    - [forms](./packages/layers/forms/README.md): Common form components and validation logic.
    - [pay](./packages/layers/pay/README.md): Components and services related to payments.
- apps/: Contains deployable applications that consume the packages.

Additional layers can be added under the `packages/layers/` directory. Other content should be organized similarly. e.g., Modules should be created under a new `packages/modules/` directory.

## Versioning & Release Workflow
This monorepo uses [Changesets](https://github.com/changesets/changesets) to manage versioning, changelogs, and publishing.

> [!NOTE]
> Automated Versioning: Please do not manually update package versions in package.json. This monorepo uses an automated workflow where the Changesets action is responsible for all version bumps, including updating internal dependencies between packages. Please familiarize yourself with the [Changesets](https://github.com/changesets/changesets) workflow before contributing.

### Adding a Change
When you have made a code change in a PR that should be included in the next release, you **must** add a changeset.

1. Run the changeset command (must be done from the repo root):
```bash
pnpm changeset
```
2. Follow the prompts to select the packages you've changed and the appropriate version bump (patch, minor, or major).
3. Write a clear summary of your change. Please be descriptive as this summary will be automatically added to the CHANGELOG.md file.
4. Commit the generated .md file to your branch.

### Publishing a Release
The release process is automated by GitHub Actions:

1. When a PR with one or more changeset files is merged into main, the Changesets action will automatically create a new "Version Packages" pull request.
2. This new PR will contain all the version bumps and the updated CHANGELOG.md files.
3. Once the "Version Packages" PR is reviewed and merged, the action will automatically publish the updated packages to the npm registry and create a corresponding GitHub Release.

## How to Contribute
If you would like to contribute, please see our [CONTRIBUTING](./CONTRIBUTING.md) guidelines.

Please note that this project is released with a [Contributor Code of Conduct](./CODE_OF_CONDUCT.md).
By participating in this project you agree to abide by its terms.