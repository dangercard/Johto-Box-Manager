const { BoxPokemon } = require("../schema");
const { setHeader } = require("../lib/header");
const { output } = require("../lib/util/output");
const { chooseBox } = require("../lib/util/chooseBox");

const selectorPrompt = require("../lib/prompts/selectorPrompt");

async function releasePokemon(callback) {
  try {
    let boxes = await getPopulatedBoxes();
    let titledBoxes = [];
    let titledPokemon = [];

    if (boxes === undefined || boxes.length === 0) {
      await output("You don't have any Pokemon in your Boxes.");
      callback();
    } else {
      boxes.forEach((box) => {
        titledBoxes.push({ title: `Box ${box.box}`, value: box.box });
      });

      let chosenBox = await chooseBox(
        "Choose the Box you want to release Pokemon from.",
        titledBoxes
      );

      let pokemonInBox = await getBoxPokemon(chosenBox);

      pokemonInBox.forEach((poke) => {
        titledPokemon.push({ title: poke.pokemon.species, value:{species:poke.pokemon.species, _id: poke._id }});
      });

      let chosenPokemon = await chooseBoxPokemon(titledPokemon);
      
      await releaseBoxPokemon(chosenBox, chosenPokemon.value._id);

      await output(`${chosenPokemon.value.species} has been released!`);

      await callback();
    }
  } catch (err) {
    console.error(err);
  }
}

async function getPopulatedBoxes() {
  let populatedBoxes;

  await BoxPokemon.find(
    { entities: { $gt: 0 } },
    { _id: 0, box: 1 },
    async (err, res) => {
      // Check for errors.
      if (err) throw err;

      populatedBoxes = res;
    }
  );

  return populatedBoxes;
}

async function getBoxPokemon(box) {
  let pokemonInBox;

  await BoxPokemon.find({ box: box }, { data: 1 }, async (err, res) => {
    // Check for errors.
    if (err) throw err;

    pokemonInBox = res[0].data;
  });

  return pokemonInBox;
}

async function chooseBoxPokemon(pokemonInBox) {
  // console.log(boxes);
  const chosenPokemon = await selectorPrompt({
    // Prompt message.
    message: "Choose Pokemon to release.",
    // Array of choices.
    choices: pokemonInBox,
  });

  // Return selected Box.
  return chosenPokemon;
}

async function releaseBoxPokemon(box, pokeId) {
  await BoxPokemon.updateOne(
    { box: box },
    { $pull: { data: { _id: pokeId } }, $inc: { entities: -1 } }
  );
}

module.exports = { releasePokemon };
