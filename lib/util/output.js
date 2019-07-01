// Simple output function so it can be awaited. Will 
// probably be moved to a separate file.
async function output(msg)
{
    console.info("\n\t" + msg + "\n");
}

module.exports = {output} ;