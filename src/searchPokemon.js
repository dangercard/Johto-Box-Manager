const {BoxPokemon} = require("../schema");
const assert = require('assert');

const searchPrompt = require("../lib/prompts/searchPrompt");

async function searchPokemon(callback)
{
    try
    {
        let input = await searchPrompt();

        await searchBoxPokemon(input.value);
    
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
        let match = input.toUpperCase();

        await BoxPokemon.find({
                $or: 
                [
                    {'data.pokemon.species':search},
                    {'data.pokemon.type1': search},
                    {'data.pokemon.type2':search},
                    {'data.nickname':search}
                ]
        },
        'box data.pokemon.species data.pokemon.type1 data.pokemon.type2 data.nickname',
        (err,res) => {
            try
            {
                assert.equal(null,err);
                // console.info(res);
                res.forEach((i) => {
                    console.info(`In Box${i.box}:`);
                    let searchRes = i.data;
                    searchRes.forEach((p) => {
                        let resMsg;
                        let spec = (p.pokemon.species);
                        let specUpper = spec.toUpperCase();
                        let t1 = p.pokemon.type1;
                        let t1Upper = t1.toUpperCase();
                        let t2;
                        let t2Upper = "";
                        if(p.pokemon.type2 != undefined)
                        {
                            t2 = p.pokemon.type2;
                            t2Upper = t2.toUpperCase();
                            resMsg = `${spec} - ${t1} - ${t2}`;
                        }
                        else
                        {
                            resMsg = `${spec} - ${t1}`;
                        }
                        // nick = p.nickname ;
                        if(specUpper.includes(match) || t1Upper.includes(match) || t2Upper.includes(match) /*|| nick.includes(input)*/)
                        {
                            console.info(resMsg);
                        }  
                    });
                });
            }
            catch(err)
            {
                throw Error(err);
            } 
        });
    }
    catch(err)
    {
        throw Error(err);
    }
}

// Export function called from main.js.
module.exports = {searchPokemon};
