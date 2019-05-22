'use strict';

const prompts = require('prompts');
 
module.exports = () =>
  prompts(
    {
      type: 'text',
      name: 'value',
      message: "Enter Pokemon Nickname:",
      hint: 'Leave empty if none',
      validate: value => (value.length <= 10) ? true : 'Nickname has a maximum of 10 characters.' 
    });