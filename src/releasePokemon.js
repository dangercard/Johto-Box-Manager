const { BoxPokemon } = require("../schema");
const { setHeader } = require("../lib/header");
const { output } = require("../lib/util/output");
const { chooseBox } = require("../lib/util/chooseBox");

async function releasePokemon(callback) {
  try {
    let boxes = await getPopulatedBoxes();
    let titledBoxes = [];

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

      console.info(pokemonInBox);
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

async function getBoxPokemon(box)
{
    let pokemonInBox;

    await BoxPokemon.find(
        {box: box},
        {data: 1},
        async (err, res) => {
          // Check for errors.
          if (err) throw err;
    
          pokemonInBox = res;
        }
      );

    return pokemonInBox;
}

module.exports = { releasePokemon };
