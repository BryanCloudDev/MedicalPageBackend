import fs from 'fs/promises'
import Changelog from 'generate-changelog'
import { config, fileName } from '../config'
import { selectGitTag } from '../inquirier/selectGitTag'

const generateChangeLog = async () => {
  const changelogText = await Changelog.generate(config)

  try {
    await fs.writeFile(fileName, changelogText)
  } catch (error) {
    console.log(`An error occured while writing the changelog: ${error}`)
  }
}

const generateChangeLogByTag = async () => {
  config.tag = await selectGitTag()

  const changelogText = await Changelog.generate(config)

  try {
    await fs.writeFile(fileName, changelogText)
  } catch (error) {
    console.log(`An error occured while writing the changelog: ${error}`)
  }
}

export { generateChangeLog, generateChangeLogByTag }
