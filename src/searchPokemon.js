// Necessary Imports.
const {BoxPokemon} = require("../schema");
const {setHeader} = require("../lib/header");
const {output} = require("../lib/output");

// Import prompt modules.
const searchPrompt = require("../lib/prompts/searchPrompt");

// Search Pokemon Functions:

// Function searchPokemon:
//      Searches for the given 
//      information in the populated Boxes.
async function searchPokemon(callback)
{
    try
    {
        // Wait for user input.
        let input = await searchPrompt();

        // Search and output the results.
        await searchBoxPokemon(input.value);
        
        // Back to the main menu.
        callback();
    }
    catch(err)
    {
        // Error handling.
        throw Error(err);
    }
}

// Function searchBoxPokemon:
//      Searches the database for 
//      the input parameter and outputs 
//      the results and location of matches.
async function searchBoxPokemon(input)
{
    
    // Create case insensitive regular 
    // expression to search the database.
    const search = new RegExp(input, 'i');

    // Store the input in uppercase for later.
    let match = input.toUpperCase();

    // Clear the screen.
    process.stdout.write('\033c');

    // Set Header.
    await setHeader();

    // Use mongoose find. There is probably a better way to do this, 
    // but given my schema structure I'm forced to return the entire 
    // box contents that have at least one match and filter it myself.
    // Will probably change later.
    await BoxPokemon.find({

        // Find matches in these fields:
        $or: 
        [
            {'data.pokemon.species':search},
            {'data.pokemon.type1': search},
            {'data.pokemon.type2':search},
            {'data.nickname':search}
        ]
    },

    // Fields to return.
    'box data.pokemon.species data.pokemon.type1 data.pokemon.type2 data.nickname',
    (err,res) => {
        // console.info(res);

        // For each Box containing a match:
        res.forEach((i) => {

            // Output Box.
            console.info(`In Box${i.box}:`);

            // Get the array of Pokemon in said Box.
            let searchRes = i.data;

            // For each pokemon in th box:
            searchRes.forEach((p) => {

                // Call filterMatches function with each pokemon in box.
                filterMatches(p,match);
            });
        });
        // This block contains a nested for loop, which isn't ideal,
        // but given the limited amount of data, I'm not worried
        // about the O(n^2) complexity at the moment. Will be improved 
        // on later, probably alongside a schema change :( .    
    });
}


// Function filterMatches:
//      Takes a pokemon object and the search
//      input (match) and compares the pokemon
//      fields with that input.
async function filterMatches(p,match)
{
    let resMsg; // Declare response message variable.
    let spec = (p.pokemon.species); // Store pokemon species.
    let specUpper = spec.toUpperCase(); // Uppercase it for comparison later.
    let t1 = p.pokemon.type1; // Store pokemon type 1.
    let t1Upper = t1.toUpperCase(); // Uppercase it for comparison later.
    let t2; // Declare type 2 variable (for scope purposes). 
    let t2Upper = ""; // Declare type 2 uppercased variable (for scope purposes).

    // If Pokemon has secondary type:
    if(p.pokemon.type2 != undefined)
    {
        t2 = p.pokemon.type2; // store type 2
        t2Upper = t2.toUpperCase(); // store type 2 uppercased
        resMsg = `${spec} - ${t1} - ${t2}`; // Store response message.
    }

     // If Pokemon doesn't have a second type:
    else
    {
        resMsg = `${spec} - ${t1}`; // Store response message.
    }

    // If Pokemon fields include the input (input is a substring of a field):
    if(specUpper.includes(match) || t1Upper.includes(match) || t2Upper.includes(match) /*|| nick.includes(input)*/)
    {
        await output(resMsg); // Output matches.
    }  
}



// Export function called from main.js.
module.exports = {searchPokemon};
