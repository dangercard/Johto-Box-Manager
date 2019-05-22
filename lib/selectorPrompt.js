// Borrowed from my friend Raul Negron: 
    // https://github.com/rnegron/noticias-pr-cli/


'use strict';

const prompts = require('prompts');

function onCancel (prompt) {
  prompt.fail('Cancelled');
}

module.exports = ({ message, choices, hint, warn }) =>
  prompts(
    {
      type: 'select',
      name: 'value',
      message: message || '',
      choices: choices || [],
      hint: hint || '',
      warn: warn || 'Opción deshabilitada...',
      initial: 0
    },
    { onCancel }
  );