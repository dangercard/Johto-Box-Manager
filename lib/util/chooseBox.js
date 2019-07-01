const selectorPrompt = require("../prompts/selectorPrompt");

// Function chooseBox:
//      Prompts the selection of a box
//      given the list of Box numbers.
async function chooseBox(msg, boxes) {
  // console.log(boxes);
  const chosenBox = await selectorPrompt({
    // Prompt message.
    message: msg,
    // Array of choices.
    choices: boxes,
  });

  // Return selected Box.
  return chosenBox.value;
}

module.exports = { chooseBox };
