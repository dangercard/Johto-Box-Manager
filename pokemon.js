// Main application file.

// Import all schema methods from the logic.js file.
const {addBoxPokemon, getBoxPokemon} = require('./logic');

// Import prompts module.
const prompts = require('./lib/prompts');

// Function  choosePokemon:
//      Prompts the selection of a pokemon 
//      given the pokedex(array of all Pokemon objects). 
async function choosePokemon(pokedex){
    const chosenPokemon = await prompts({
        // Prompt message:
        message: "Choose the Pokemon you want to add.",
        // Array of choices 
        choices:pokedex
    });

    // Return selected Pokemon object.
    return chosenPokemon.value; 
}


// Function chooseBox:
//      Prompts the selection of a box
//      given the list of Box numbers.
async function chooseBox(boxes){
    const chosenBox = await prompts({
        // Prompt message.
        message:"Choose the Box where you want to add the Pokemon.",
        // Array of choices.
        choices:boxes
    });
   
    // Return selected Box.
    return chosenBox.value;
}

// Main menu function
async function addPokemon(){
    let pokedex = [
        {title:"Chikorita", value:{dexNum: 1,species:"Chikorita",type1:"Grass"}},
        {title:"Bayleaf", value:{dexNum: 2,species:"Bayleaf",type1:"Grass"}}
    ];

    let boxes = [
        {title:"Box1",value:1},
        {title:"Box2",value:2}
    ];
    let chosenBox = await chooseBox(boxes); 
    let chosenNewPokemon = await choosePokemon(pokedex);
    console.info(`${chosenNewPokemon.species} added to Box${chosenBox}.`);
}

async function chooseOption(options){
    const chosenOption = await prompts({
        // Prompt message.
        message:"Please select an option:",
        // Array of choices.
        choices:options
    });
   
    // Return selected Box.
    return chosenOption.value;
}

async function main(){
    let options = [ 
        {title:"1.  Add Pokemon", value: addPokemon},
        {title:"2.  Find Pokemon", value:"soon"}
    ];

    let chosenOption = await chooseOption(options);
    chosenOption();
    
    
}



main();
