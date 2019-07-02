const cFonts = require("cfonts");

async function setHeader()
{
    process.stdout.write("\033c"); // Clear the screen.

    cFonts.say('Johto Box Manager', {
        font: 'shade',
        align: 'left',
        colors: ['#fff','#000'],
        background: 'black',
        letterSpacing: 1,
        lineHeight: 1,
        space: false,
        maxLength: '0'
    });    
}

module.exports = {setHeader};
