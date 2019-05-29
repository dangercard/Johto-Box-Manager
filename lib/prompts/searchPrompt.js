'use strict';

const prompts = require('prompts');
 
module.exports = () =>
  prompts(
    {
      type: 'text',
      name: 'value',
      message: "Enter some pokemon info:",
      hint: 'species,nickname or type.'    
    });