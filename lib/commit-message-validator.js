'use strict'

const findRoot = require('find-root')
const fs = require('fs')
const path = require('path')

const DEFAULT_PATTERN = '.+'
const DEFAULT_ERROR_MESSAGE = 'Commit message does not match pattern'
const MERGE_REGEX = /^Merge\s+.+/i

const getOptions = () => {
  try {
    const root = findRoot()
    const packageJson = path.join(root, 'package.json')
    const packageObj = JSON.parse(fs.readFileSync(packageJson, 'utf8'))
    let options = (packageObj && packageObj.config && packageObj.config['commit-message-validator']) || {}
    options.pattern = options.pattern || DEFAULT_PATTERN
    options.errorMessage = options.errorMessage || DEFAULT_ERROR_MESSAGE
    return options
  } catch (error) {
    return null
  }
}
const commitMessageValidator = (message) => {
  try {
    if (MERGE_REGEX.test(message)) {
      process.exit(0)
    }

    const options = getOptions()
    const regex = new RegExp(options.pattern)
    if (regex.test(message)) {
      process.exit(0)
    } else {
      console.warn(`Commit message cannot match pattern "${options.pattern}"`)
      process.exit(1)
    }
  } catch (error) {
    process.exit(1)
  }
}

module.exports = commitMessageValidator
