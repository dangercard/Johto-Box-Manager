// Main application file.
const {addPokemon} = require("./src/addPokemon");
// Import prompt module.
const selectorPrompt = require("./lib/prompts/selectorPrompt");

// Start application.
mainMenu();

// Function MainMenu:
//      Starting point of application.
//      Actions are selected here.
async function mainMenu() {
  // Array of options/actions
  let options = [
    { title: "1.  Add Pokemon", value: addPokemon },
    { title: "2.  Find Pokemon", value: "soon" }
  ];

  // Wait for option selection.
  let chosenOption = await chooseOption(options);

  // Execute option.
  chosenOption(mainMenu);
}


// Function chooseOption:
//      Prompts the selection of
//      the available options.
async function chooseOption(options) {
  const chosenOption = await selectorPrompt({
    // Prompt message.
    message: "Please select an option:",
    // Array of choices.
    choices: options
  });

  // Return selected option.
  return chosenOption.value;
}




