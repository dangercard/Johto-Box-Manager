const mongoose = require('mongoose');
const assert = require('assert');
mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost:27017/Johto-Box-Manager',{ useNewUrlParser: true })

function toLower(l){
    return l.toLowerCase();
}

const PokemonSchema = mongoose.Schema({
    species: {type: String, set: toLower},
    type1: {type: String, set: toLower},
    type2: {type: String, set: toLower}
    // level: {type: Number, min:2 , max:100}
});

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

const BoxSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    availableSpace: {type:Number, min: 0, max:20},

});

const Box = mongoose.model('Box', BoxSchema);


const BoxPokemonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    box:{
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'Box'
    },
    pokemon:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pokemon'
    }
});

const BoxPokemon = mongoose.model('BoxPokemon', BoxPokemonSchema);

const addPokemon = (pokemon) => {
    Pokemon.create(pokemon,(err)=> {
        assert.equal(null,err);
        console.info('New Pokemon Added.');
        mongoose.disconnect();
    });
};

const getPokemon = (name) => {
    const search = new RegExp(name, 'i');
    Pokemon.find({$or: [{species: search }]})
    .exec((err, pokemon) => {
      assert.equal(null, err);
      console.info(pokemon);
      console.info(`${pokemon.length} matches`);
      mongoose.disconnect();
    });
}

module.exports = {addPokemon,getPokemon};
