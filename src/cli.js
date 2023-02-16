#!/usr/bin/env node
const minimist = require('minimist');
const { screenRecord } = require('./index');

const argv = minimist(process.argv.slice(2));

if (!argv.url) {
  throw new Error('please pass --input to the url of the data');
}
if (!argv.output) {
  throw new Error('please pass --output to the output path');
}
// TODO other args
(async () => {
  await screenRecord({url: argv.url, output: argv.output})
})()
