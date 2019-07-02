// Main application file.
const { addPokemon } = require("./src/addPokemon");
const { searchPokemon } = require("./src/searchPokemon");
const { releasePokemon } = require("./src/releasePokemon");
const { setHeader } = require("./lib/header");
const { logOut } = require("./src/logOut");

// Import prompt modules.
const selectorPrompt = require("./lib/prompts/selectorPrompt");

// Start application.

// Call header.
setHeader();

// Open Main Menu.
mainMenu().catch((err) => {
  console.error(err);
});

// Function MainMenu:
//      Starting point of application.
//      Actions are selected here.
async function mainMenu() {
  try {
    // Array of options/actions.
    let options = [
      { title: "|  Add Pokemon     |", value: addPokemon },
      { title: "|  Search Pokemon  |", value: searchPokemon },
      { title: "|  Release Pokemon | ", value: releasePokemon },
      { title: "|  Log Out  |", value: logOut },
    ];
    // Wait for option selection.
    let chosenOption = await chooseOption(options);

    // Execute option.
    await chosenOption(mainMenu);
  } catch (err) {
    // Handle errors.
    throw Error(err);
  }
}

// Function chooseOption:
//      Prompts the selection of
//      the available options.
async function chooseOption(options) {
  try {
    const chosenOption = await selectorPrompt({
      // Prompt message.
      message: "Please select an option:",
      // Array of choices.
      choices: options,
    });

    // Return selected option.
    return chosenOption.value;
  } catch (err) {
    console.error(err);
  }
}
