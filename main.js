// Main application file.
const {addPokemon} = require("./src/addPokemon");
const {searchPokemon} = require("./src/searchPokemon");
const {setHeader} = require("./lib/header");
// const {logOut} = require("./src/logOut");
// Import prompt modules.
const selectorPrompt = require("./lib/prompts/selectorPrompt");

// Start application.
process.stdout.write('\033c');

setHeader();

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
      { title: "|  Add Pokemon     |", value: addPokemon },
      { title: "|  Search Pokemon  |", value: searchPokemon }
      // { title: "|  Log Out  |", value: logOut }
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




