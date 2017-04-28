# commit-message-validator
Git commit-msg hook validator

This package provides you a binary that you can use as a git hook to validate the commit message.

If you are using githook package such as [husky](https://www.npmjs.com/package/husky), add `"commitmsg": "commit-message-validator"` to your npm scripts in package.json.

# Installation

This module is distributed via npm which is bundled with node and should be installed as one of your project's devDependencies:

    npm install commit-message-validator

# Usage

1. Install this package as one of your project's devDependencies
2. Install githook [husky](https://www.npmjs.com/package/husky)
3. Custom commit-message regex pattern in package.json

        {
            "config": {
                "commit-message-validator": {
                    /* your config here */
                    "pattern": "your regex pattern here"
                }
            }
        }
    