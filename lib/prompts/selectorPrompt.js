const {logOut} = require("../../src/logOut");
'use strict';

const prompts = require('prompts');

function onCancel (prompt) {
  logOut(); // Close Terminal
}

module.exports = ({ message, choices}) =>
  prompts(
    {
      type: 'select',
      name: 'value',
      message: message || '',
      choices: choices || [],
      hint: 'Use arrow keys to move, Enter/Return to select, Ctrl-c to quit.',
      initial: 0
    },
    { onCancel }
  );