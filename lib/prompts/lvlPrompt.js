'use strict';

const prompts = require('prompts');
 
module.exports = () =>
  prompts(
    {
      type: 'number',
      name: 'value',
      message: "Enter Pokemon Level:",
      hint: 'From 2 to 100',
      validate: value => (value >= 2 && value <= 100) ? true : 'Levels must be from 2 to 100' 
    });