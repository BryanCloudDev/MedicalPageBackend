import {
  generateChangeLog,
  generateChangeLogByTag
} from './helpers/createChangelog.js'
import { generationTypeInquirier } from './inquirier/index.js'

export const createChangelog = async () => {
  try {
    const generationType = await generationTypeInquirier()

    if (generationType === 'By tag') {
      await generateChangeLogByTag()
      return
    }

    await generateChangeLog()
  } catch (error) {
    console.error('Error:', error)
  }
}
