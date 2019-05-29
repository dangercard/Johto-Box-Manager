// Necessary imports.
const { P } = require("../lib/pokedex");
const { B } = require("../lib/boxes");
const { BoxPokemon } = require("../schema");
const assert = require('assert');

// Import prompt modules.
const selectorPrompt = require("../lib/prompts/selectorPrompt");
const lvlPrompt = require("../lib/prompts/lvlPrompt");
const nicknamePrompt = require("../lib/prompts/nicknamePrompt");

// Add Pokemon Functions:

// Function addPokemon:
//      Prompts for the Pokemon information
//      needed to store it in a box.
async function addPokemon(callback) {
  try
  {
    let Pokedex = P; // Gen 2 Pokedex.
    let Boxes = B; // Gen 2 Boxes.
  
    // Store the chosen box.
    let chosenBox = await chooseBox(Boxes)
    .catch((err) => {
      console.error(err);
    });
    // Store the chosen pokemon.
    let chosenNewPokemon = await choosePokemon(Pokedex)
    .catch((err) => {
      console.error(err);
    });
    //Store Pokemon nickname.
    let pokemonNickname = await nicknamePrompt()
    .catch((err) => {
      console.error(err);
    });
    // Store Pokemon level.
    let pokemonLevel = await lvlPrompt()
    .catch((err) => {
      console.error(err);
    });
  
    // Store new Pokemon in desired Box.
    await addBoxPokemon(
      chosenBox,
      chosenNewPokemon,
      pokemonNickname.value,
      pokemonLevel.value
    )
    // Report errors.
    .catch((err) => {
      console.error(err);
    });

    // Report new addition.
    console.info(`Added ${chosenNewPokemon} to Box${chosenBox}!`)

    callback();
  }
  // Handle errors.
  catch(err)
  {
    throw Error(err);
  }
}


// Function chooseBox:
//      Prompts the selection of a box
//      given the list of Box numbers.
async function chooseBox(boxes) {
    // console.log(boxes);
  try
  {
    const chosenBox = await selectorPrompt({
      // Prompt message.
      message: "Choose the Box where you want to add the Pokemon.",
      // Array of choices.
      choices: boxes
    });
  
    // Return selected Box.
    return chosenBox.value;
  }
  catch(err){
    throw Error(err);
  }
}


// Function  choosePokemon:
//      Prompts the selection of a pokemon
//      given the pokedex(array of all Pokemon objects).
async function choosePokemon(pokedex) {
  try
  {
    const chosenPokemon = await selectorPrompt({
      // Prompt message:
      message: "Choose the Pokemon you want to add.",
      // Array of choices.
      choices: pokedex
    });
  
    // Return selected Pokemon object.
    return chosenPokemon.value;
  }
  catch(err)
  {
    throw Error(err);
  }
}


// Function addBoxPokemon:
//      Inserts new Pokemon into
//      i'ts corresponding box.
        
async function addBoxPokemon(box,pokemon,nickname,level)
{
  try 
  {
    await BoxPokemon.findOneAndUpdate(

      // Find condition.
      {box:box}, 
         
      // Update:
      {   
        // Increment by 1.
        $inc:{entities:1}, 
        // Push new Pokemon into data array.
        $push:{data:{pokemon:pokemon, nickname:nickname, level:level}}

      },

      // Options
      {
        // If condition not met, 
        // create a new entry that 
        // meets it.
        upsert:true,

        // Return modified
        // version of this 
        // document.
        new:true
      }
    ); 
  }
  catch(err){
    throw Error(err);
  }
};

// Export function called from main.js.
module.exports = {addPokemon};






