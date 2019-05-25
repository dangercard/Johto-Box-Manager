// Main application file.

// Import all schema methods from the logic.js file.
const { P } = require("./lib/pokedex");
const { B } = require("./lib/boxes");
const { BoxPokemon /*, getBoxPokemon*/ } = require("./logic");
const assert = require('assert');


// Import prompt modules.
const selectorPrompt = require("./lib/selectorPrompt");
const lvlPrompt = require("./lib/lvlPrompt");
const nicknamePrompt = require("./lib/nicknamePrompt");

async function addBoxPokemon(box,pokemon,nickname,level)
{
    BoxPokemon.findOneAndUpdate(
        {box:box},
        {
            $inc:{entities:1},
            $push:{data:{pokemon:pokemon, nickname:nickname, level:level}}
        },
        {upsert:true,new:true},
        async (err) => {
            assert.equal(null,err);
            // mongoose.disconnect();
            console.info(`${pokemon.species} added to Box${box}!`);
            await mainMenu();
        }
    );
};

// Function  choosePokemon:
//      Prompts the selection of a pokemon
//      given the pokedex(array of all Pokemon objects).
async function choosePokemon(pokedex) {
  const chosenPokemon = await selectorPrompt({
    // Prompt message:
    message: "Choose the Pokemon you want to add.",
    // Array of choices.
    choices: pokedex
  });

  // Return selected Pokemon object.
  return chosenPokemon.value;
}

// Function chooseBox:
//      Prompts the selection of a box
//      given the list of Box numbers.
async function chooseBox(boxes) {
  console.log(boxes);
  
  const chosenBox = await selectorPrompt({
    // Prompt message.
    message: "Choose the Box where you want to add the Pokemon.",
    // Array of choices.
    choices: boxes
  });

  // Return selected Box.
  return chosenBox.value;
}

// Function addPokemon:
//      Prompts for the Pokemon information
//      needed to store it in a box.
async function addPokemon() {
  let Pokedex = P; // Gen 2 Pokedex.
  let Boxes = B; // Gen 2 Boxes.

  // Store the chosen box.
  let chosenBox = await chooseBox(Boxes);
  // Store the chosen pokemon.
  let chosenNewPokemon = await choosePokemon(Pokedex);
  //Store Pokemon nickname.
  let pokemonNickname = await nicknamePrompt();
  // Store Pokemon level.
  let pokemonLevel = await lvlPrompt();

  await addBoxPokemon(
    chosenBox,
    chosenNewPokemon,
    pokemonNickname.value,
    pokemonLevel.value,
    mainMenu
  );
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
  chosenOption();
}

// Start application.
mainMenu();
