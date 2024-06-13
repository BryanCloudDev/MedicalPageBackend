import inquirer from 'inquirer'
import { getGitTags } from '../helpers/index.js'

const selectGitTag = async () => {
  const answer = await inquirer.prompt({
    type: 'list',
    name: 'gitTag',
    message: 'Which git tag do you want to generate the changelog from?',
    choices: getGitTags()
  })

  const { gitTag } = answer

  return gitTag
}

export { selectGitTag }
