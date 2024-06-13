## Commit Types for generate-changelog

`generate-changelog` is a tool that can generate changelogs from commit messages in a Git repository. Each commit message can be classified into different types for better organization of the changelog. Below are the commit types supported by `generate-changelog`:

- **breaking**: Changes that break backward compatibility.
- **build**: Changes related to the build system or dependencies.
- **ci**: Changes related to continuous integration or build system configuration.
- **chore**: Changes to project infrastructure or maintenance tasks.
- **docs**: Changes to project documentation.
- **feat**: New features or functionalities added.
- **fix**: Bug fixes or error corrections.
- **other**: Other changes that don't fit into any other category.
- **perf**: Performance improvements.
- **refactor**: Code changes that don't add new features or fix bugs.
- **revert**: Reversions of previous changes.
- **style**: Changes to code style, such as code formatting changes or variable names.
- **test**: Adding new tests or improving existing tests.

These are the commit types that can be used when generating a changelog with `generate-changelog`. By categorizing commits into these types, a more organized and understandable changelog can be created for users and project collaborators.

The commit format is the following:

```text
type(category): description
```

Where `type` denotes the commit type, `category` serves as a means to further categorize your commit under a specific type, and `description` provides an explanation of the change made.

The script is invoked by running: `npm run commit`

It prompts you to select the change type, category, and description. If you agree with the result, it will create the commit automatically.

Please note that you can also create the commit manually, but it will be validated by a hook in the .git folder, ensuring it complies with the nomenclature specified by the library for generating the changelog file.

To generate the changelog file, run: `npm run changelog`

It prompts you to choose whether you want to generate a changelog from a specific tag or include all the commits made.

The resulting changelog will be printed in a file named `CHANGELOG.md`.
