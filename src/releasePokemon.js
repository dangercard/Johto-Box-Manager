// Necessary imports:
const { BoxPokemon } = require("../schema");
const { setHeader } = require("../lib/header");
const { output } = require("../lib/util/output");
const { chooseBox } = require("../lib/util/chooseBox");

const selectorPrompt = require("../lib/prompts/selectorPrompt");

// Function releasePokemon:
//      Allows users to release/remove
//      Pokemon from boxes.
async function releasePokemon(callback) {
  try {
    // Get list of boxes with Pokemon in them.
    let boxes = await getPopulatedBoxes();
    let titledBoxes = [];
    let titledPokemon = [];

    // If all boxes are empty:
    if (boxes === undefined || boxes.length === 0) {
      await setHeader(); // Place header.

      // Output message.
      await output("You don't have any Pokemon in your Boxes.");

      // Call MainMenu.
      callback();
    }
    // If there are boxes with Pokemon inside them:
    else {
      await setHeader(); // Place header.

      // For each box with Pokemon
      boxes.forEach((box) => {
        // Add to array of boxes with Pokemon in them.
        titledBoxes.push({ title: `Box ${box.box}`, value: box.box });
      });

      // Prompt user to choose one of the non-empty boxes.
      let chosenBox = await chooseBox(
        "Choose the Box you want to release Pokemon from.",
        titledBoxes
      );

      // Get array of all Pokemon inside the selected box.
      let pokemonInBox = await getBoxPokemon(chosenBox);

      // Prepare an array with all Pokemon in the box to prompt the user.
      pokemonInBox.forEach((poke) => {
        titledPokemon.push({
          title: poke.pokemon.species,
          value: { species: poke.pokemon.species, _id: poke._id },
        });
      });

      // Prompt user to choose the Pokemon to be released.
      let chosenPokemon = await chooseBoxPokemon(titledPokemon);

      // Release the selected Pokemon.
      await releaseBoxPokemon(chosenBox, chosenPokemon.value._id);

      await setHeader(); // Place header.

      // Output message.
      await output(`${chosenPokemon.value.species} has been released!`);

      // Call MainMenu.
      await callback();
    }
  } catch (err) {
    // Handle caught errors:
    console.error(err);
  }
}

// Function getPopulatedBoxes:
//      Returns array of boxes
//      with Pokemon in them.
async function getPopulatedBoxes() {
  let populatedBoxes;

  await BoxPokemon.find(
    // Find condition.
    { entities: { $gt: 0 } },

    // Exclude id's and only return box number.
    { _id: 0, box: 1 },
    async (err, res) => {
      // Check for errors.
      if (err) throw err;

      populatedBoxes = res;
    }
  );

  // Return the array.
  return populatedBoxes;
}

// Function getBoxPokemon:
//      Returns array of Pokemon
//      present in a specified box.
async function getBoxPokemon(box) {
  let pokemonInBox;

  // Select all Pokemon in box.
  await BoxPokemon.findOne({ box: box }, { data: 1 }, async (err, res) => {
    // Check for errors.
    if (err) throw err;

    pokemonInBox = res.data;
  });

  // Return array.
  return pokemonInBox;
}

// Function chooseBoxPokemon:
//      Prompts user to choose 
//      the Pokemon from the box
//      that will be released.
async function chooseBoxPokemon(pokemonInBox) {
  const chosenPokemon = await selectorPrompt({
    // Prompt message.
    message: "Choose Pokemon to release.",
    // Array of choices.
    choices: pokemonInBox,
  });

  // Return selected Box.
  return chosenPokemon;
}

// Function releaseBoxPokemon:
//      Releases/removes selected
//      Pokemon from the box.
async function releaseBoxPokemon(box, pokeId) {
  await BoxPokemon.updateOne(
    { box: box },
    { $pull: { data: { _id: pokeId } }, $inc: { entities: -1 } }
  );
}

// Export function called from main.js.
module.exports = { releasePokemon };
