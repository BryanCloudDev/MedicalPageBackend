import {
  generateChangeLog,
  generateChangeLogByTag
} from './helpers/createChangelog'
import { generationTypeInquirier } from './inquirier/index'

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
