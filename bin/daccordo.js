#!/usr/bin/env node
const fs = require('fs-extra')
const chalk = require('chalk')
const commandLineArgs = require('command-line-args')
const DAccordo = require('../src/DAccordo')
const pkg = require('../package.json')

const optionDefinitions = [
  {
    name: 'help',
    alias: 'h',
    type: Boolean
  },
  {
    name: 'generate',
    alias: 'g',
    type: Boolean
  }
]

function error(message) {
  if (!Array.isArray(message)) {
    message = [message]
  }
  console.error(chalk.red(message[0]))
  if (message[1]) {
    console.info(message[1])
  }
  /*eslint-disable-next-line*/
  process.exit(1)
}

let options = {}
try {
  options = commandLineArgs(optionDefinitions, {
    camelCase: true
  })
} catch (e) {
  error(e.message)
}

options.isCLI = true

console.info(chalk.bold.grey(`@secrez/daccordo v${pkg.version}`))

if (options.help) {
  console.info(`${pkg.description}

Options:
  -h, --help              This help.
  -g, --generate          Generate a new key pair
`)
  // eslint-disable-next-line no-process-exit
  process.exit(0)
}

DAccordo.exec(options)
