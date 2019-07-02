// Necessary imports.
const { P } = require("../lib/pokedex");
const { B } = require("../lib/boxes");
const { BoxPokemon } = require("../schema");
const { setHeader } = require("../lib/header");
const { output } = require("../lib/util/output");
const { chooseBox } = require("../lib/util/chooseBox");

// Import prompt modules.
const selectorPrompt = require("../lib/prompts/selectorPrompt");
const lvlPrompt = require("../lib/prompts/lvlPrompt");
const nicknamePrompt = require("../lib/prompts/nicknamePrompt");

// Add Pokemon Functions:

// Function addPokemon:
//      Prompts for the Pokemon information
//      needed to store it in a box.
async function addPokemon(callback) {
  try {
    await setHeader(); // Place header.

    let Pokedex = P; // Gen 2 Pokedex.
    let Boxes = B; // Gen 2 Boxes.

    // Store the chosen box.
    let chosenBox = await chooseBox(
      "Choose the Box where you want to add the Pokemon.",
      Boxes
    );

    // Store the chosen pokemon.
    let chosenNewPokemon = await choosePokemon(Pokedex);

    //Store Pokemon nickname.
    let pokemonNickname = await nicknamePrompt();

    // Store Pokemon level.
    let pokemonLevel = await lvlPrompt();

    // Store new Pokemon in desired Box.
    await addBoxPokemon(
      chosenBox,
      chosenNewPokemon,
      pokemonNickname.value,
      pokemonLevel.value
    );

    await setHeader(); // Place header.

    // output the message.
    await output(`Added ${chosenNewPokemon.species} to Box${chosenBox}!`);
    callback(); // Back to main menu.
  } catch (err) {
    // Handle errors.
    throw Error(err);
  }
}

// Function  choosePokemon:
//      Prompts the selection of a pokemon
//      given the pokedex(array of all Pokemon objects).
async function choosePokemon(pokedex) {
  const chosenPokemon = await selectorPrompt({
    // Prompt message:
    message: "Choose the Pokemon you want to add.",
    // Array of choices.
    choices: pokedex,
  });

  // Return selected Pokemon object.
  return chosenPokemon.value;
}

// Function addBoxPokemon:
//      Inserts new Pokemon into
//      i'ts corresponding box.
async function addBoxPokemon(box, pokemon, nickname, level) {
  await BoxPokemon.findOneAndUpdate(
    // Find condition.
    { box: box },

    // Update:
    {
      // Increment by 1.
      $inc: { entities: 1 },
      // Push new Pokemon into data array.
      $push: { data: { pokemon: pokemon, nickname: nickname, level: level } },
    },

    // Options
    {
      // If condition not met,
      // create a new entry that
      // meets it.
      upsert: true,

      // Return modified
      // version of this
      // document.
      new: true,
    }
  );
}

// Export function called from main.js.
module.exports = { addPokemon };
