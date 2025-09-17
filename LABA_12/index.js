const fs = require('fs');
const { console } = require('inspector');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error('Ошибка чтения файла: ', err);
        return;
    }

    fs.writeFile('callback.txt', data.toUpperCase(), (err) => {
        if (err) {
            if(err) return console.log(err);
        }

        console.log("Запись файла завершена");
    });
});