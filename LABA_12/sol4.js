const fs = require('fs');

try{
    const readablestream = fs.createReadStream('large_input.txt');
    const writeblestream = fs.createWriteStream('large_out.txt');

    readablestream.pipe(writeblestream);
} catch(err) {
    console.error("Ощибка при копировании: ", err);
}