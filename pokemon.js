const program = require('commander');

const {addPokemon, getPokemon} = require('./logic');

program
.version('1.0.0')
.description('cli for managing your generation 2 PC boxes.');

program
.command('addPokemon <species> <type1> [type2]')
.alias('a')
.description('add pokemon')
.action((species, type1, type2) => {
    if(type2 == undefined)
    {
        addPokemon({species,type1});
    }

    else{
        addPokemon({species,type1,type2});
    }
});

program
.command('getPokemon <name>')
.alias('s')
.description('Search for pokemon')
.action(name => getPokemon(name));

program.parse(process.argv);