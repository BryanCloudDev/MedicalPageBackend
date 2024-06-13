import { execSync } from 'child_process'

const getGitTags = () => {
  const tagsString = execSync('git tag', { encoding: 'utf8' })
  return tagsString.trim().split('\n')
}

export { getGitTags }
