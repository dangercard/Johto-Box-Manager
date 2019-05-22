const mongoose = require('mongoose');
const assert = require('assert');
mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost:27017/Johto-Box-Manager',{ useNewUrlParser: true })


const BoxPokemonSchema = mongoose.Schema({
    box:{type: Number, min:1, max:14},
    pokemon:{
             dexNum:{type: Number, min:1,max:251},
             species:{type: String},
             type1:{type: String},
             type2:{type:String}
            },

    nickname:{type:String},
    level:{type:Number, min:2,max:100},
});

const BoxPokemon = mongoose.model('BoxPokemon', BoxPokemonSchema);

const addBoxPokemon = (box,pokemon,nickname,level,mainMenu) => {
    BoxPokemon.create({box,pokemon,nickname,level},(err)=> {
        assert.equal(null,err);
        console.info(`${pokemon.species} added to Box${box}!`);
        mongoose.disconnect();
        mainMenu();
    });

    // console.info(box)
};

// const getBoxPokemon = (name) => {
//     const search = new RegExp(name, 'i');
//     Pokemon.find({$or: [{species: search }, {type1: search}, {type2: search}]})
//     .exec((err, pokemon) => {
//       assert.equal(null, err);
//       console.info(pokemon);
//       console.info(`${pokemon.length} matches`);
//       mongoose.disconnect();
//     });
// }

module.exports = {addBoxPokemon/*,getBoxPokemon*/};
