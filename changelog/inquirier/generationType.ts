import inquirer from 'inquirer'

const generationTypeInquirier = async () => {
  const answers = await inquirer.prompt({
    type: 'list',
    name: 'generationType',
    message: 'How do you want to generate the changelog?',
    choices: ['By tag', 'For all commits']
  })

  const { generationType } = answers

  return generationType
}

export { generationTypeInquirier }
