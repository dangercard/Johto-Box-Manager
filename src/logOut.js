const cFonts = require("cfonts");
const term = require("terminal-kit").terminal;
// Function logOut:
//      Closes the terminal application.
const logOut = async () => {
    process.stdout.write('\033c'); // Clear screen on start.

    // Output Goodbye message.
    cFonts.say("We hope to see you again!", {
        font: 'console',
        align: 'center',
        colors:['magentaBright'],
        background: 'transparent',
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: '0'
    });
   
    process.exit(1); // Close Terminal
};

// Export logOut Function
module.exports = {logOut};