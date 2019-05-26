const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const db = mongoose.connect('mongodb://localhost:27017/Johto-Box-Manager',{ useNewUrlParser: true })


const BoxPokemonSchema = mongoose.Schema({
    box:{type: Number, min:1, max:14},
    entities: {type: Number, min:0, max: 20},
    data:[{
            pokemon:{
                    dexNum:{type: Number, min:1,max:251},
                    species:{type: String},
                    type1:{type: String},
                    type2:{type:String}
                    },

            nickname:{type:String},
            level:{type:Number, min:2,max:100}
                }]
});

const BoxPokemon = mongoose.model('BoxPokemon', BoxPokemonSchema);



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

module.exports = {BoxPokemon/*,getBoxPokemon*/};
