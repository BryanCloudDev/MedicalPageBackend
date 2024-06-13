import { execSync } from 'child_process'
import inquirer from 'inquirer'

export const createChangelogCommit = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Commit type:',
        choices: [
          'breaking',
          'build',
          'ci',
          'chore',
          'docs',
          'feat',
          'fix',
          'other',
          'perf',
          'refactor',
          'revert',
          'style',
          'test'
        ]
      },
      {
        type: 'input',
        name: 'category',
        message: 'Category:',
        default: 'uncategorized'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description:',
        validate: (value) => {
          if (value.trim() === '') {
            return 'Please enter a description.'
          }
          return true
        }
      },
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Do you want to confirm this commit?',
        default: true
      }
    ])
    const { type, category, description, confirm } = answers

    // in order to keep consistency in text
    const loweredCategory = category.toLowerCase()

    if (confirm) {
      const commitMessage = `${type}(${loweredCategory}): ${description}`
      console.log(`Commit message: ${commitMessage}`)

      const command = `git commit -m "${commitMessage}"`
      try {
        execSync(command, { stdio: 'inherit' })
        console.log('Commit successful.')
      } catch (error) {
        console.error('Error:', error.message)
      }
    } else {
      console.log('Commit canceled.')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
