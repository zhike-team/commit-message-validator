'use strict'

const findRoot = require('find-root')
const fs = require('fs')
const path = require('path')

const DEFAULT_PATTERN = '.+'
const MERGE_REGEX = /^Merge\s+.+/i

const getOptions = () => {
  try {
    const root = findRoot()
    const packageJson = path.join(root, 'package.json')
    const packageObj = JSON.parse(fs.readFileSync(packageJson, 'utf8'))
    let options = (packageObj && packageObj.config && packageObj.config['commit-message-validator']) || {}
    options.pattern = options.pattern || DEFAULT_PATTERN

    if (!Array.isArray(options.pattern)) {
      options.pattern = [options.pattern]
    }
    return options
  } catch (error) {
    return null
  }
}
const commitMessageValidator = (message) => {
  if (MERGE_REGEX.test(message)) {
    process.exit(0)
  }

  const options = getOptions()
  const patterns = options.pattern
  for (let pattern of patterns) {
    try {
      const regex = new RegExp(pattern)
      if (regex.test(message)) {
        process.exit(0)
      } 
    } catch (error) {
        // do nothing
    }
  }
  console.warn('Commit message cannot match pattern')
  process.exit(1)
}

module.exports = commitMessageValidator
