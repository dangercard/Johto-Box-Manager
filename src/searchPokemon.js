const {BoxPokemon} = require("../schema");
const assert = require('assert');

const searchPrompt = require("../lib/prompts/searchPrompt");

async function searchPokemon(callback)
{
    try
    {
        let input = await searchPrompt();

        await searchBoxPokemon(input);
    
        callback();
    }
    catch(err)
    {
        throw Error(err);
    }
}

async function searchBoxPokemon(input)
{
    try
    {
        const search = new RegExp(input, 'i');

        await BoxPokemon.find({
                $or: 
                [
                    {'data.pokemon.species':search},
                    {'data.pokemon.type1': search},
                    {'data.pokemon.type2':search},
                    {'data.nickname':search}
                ]
        },
        'box data.pokemon.species',
        (err,res) => {
            assert.equal(null,err);
            console.info(res[0]);
        });
    }
    catch(err)
    {
        throw Error(err);
    }
}

// Export function called from main.js.
module.exports = {searchPokemon};
