// Main application file.
const {addPokemon} = require("./src/addPokemon");
const {searchPokemon} = require("./src/searchPokemon");
// Import prompt module.
const selectorPrompt = require("./lib/prompts/selectorPrompt");

// Start application.
mainMenu().catch((err) => {
  console.error(err);
});

// Function MainMenu:
//      Starting point of application.
//      Actions are selected here.
async function mainMenu() {
  try
  {
    // Array of options/actions.
    let options = [
      { title: "1.  Add Pokemon", value: addPokemon },
      { title: "2.  Search Pokemon", value: searchPokemon }
    ];

    // Wait for option selection.
    let chosenOption = await chooseOption(options);

    // Execute option.
    chosenOption(mainMenu).catch((err) => {
      console.error(err);
    });
  }
  // Handle errors.
  catch(err)
  {
    throw Error(err);
  }
  
}


// Function chooseOption:
//      Prompts the selection of
//      the available options.
async function chooseOption(options) {
  try
  {
    const chosenOption = await selectorPrompt({
      // Prompt message.
      message: "Please select an option:",
      // Array of choices.
      choices: options
    });
  
    // Return selected option.
    return chosenOption.value;
  }
  // Handle errors.
  catch(err)
  {
    throw Error(err);
  }
}




