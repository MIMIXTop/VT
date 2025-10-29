const fs = require('fs');

async function readFileWithPromises(){

    try{
       var data = await fs.promises.readFile('input.txt', 'utf-8',);
       await fs.promises.writeFile('promises.txt', data.toUpperCase());
       await fs.promises.appendFile('promises.txt', '\n--- End file ---');
    } catch(err) {
        console.error('Ошибка чтения файла:', err);
    }
}

readFileWithPromises()