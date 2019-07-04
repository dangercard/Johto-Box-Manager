const {logOut} = require("../../src/logOut");

'use strict';

const prompts = require('prompts');

function onCancel (prompt) {
  logOut(); // Close Terminal
}
 
module.exports = () =>
  prompts(
    {
      type: 'text',
      name: 'value',
      message: "Enter some pokemon info:",
      hint: 'species,nickname or type.'    
    },
    { onCancel }
    );