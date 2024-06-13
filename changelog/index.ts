import inquirer from 'inquirer'
import { createChangelog } from './create-changelog.js'
import { createChangelogCommit } from './create-changelog-commit.js'

const main = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'generationType',
      message: 'What action would you like to perform?',
      choices: ['Create changelog', 'Create commit']
    }
  ])

  if (answers.generationType === 'Create changelog') {
    await createChangelog()
    return
  }
  await createChangelogCommit()
}

main()
