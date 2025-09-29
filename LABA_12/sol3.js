const fs = require('fs').promises
const path = require('path')

async function createFile(fileName) {
    await fs.writeFile(fileName, '')
}

async function start () {
    const my_directory_dir = 'my_directory';
    const first = path.join(my_directory_dir, 'file1.txt');
    const second = path.join(my_directory_dir, 'data.json')

    try {

        try {
            await fs.access('my_directory');
        } catch (err) {
            await fs.mkdir('my_directory');
        }

        await createFile(first);
        await createFile(second);

        
        const files = await fs.readdir(my_directory_dir)
        console.log('In my_directory: ')
        console.log(files);

        console.log('Types elements:')
        for (const item of files) {
            const itemPath = path.join(my_directory_dir, item);
            const status = await fs.stat(itemPath);

            if(status.isFile()) {
                console.log(`${item} is a file`)
            } else if (status.isDirectory()) {
                console.log(`${item} is a directory`)
            }
        }

        await fs.unlink(second);
        console.log('\nФайл data.json удалён.');

        // ● Проверяет, что file1.txt остался, а data.json удален.
        try {
            await fs.access(first);
            console.log('file1.txt существует.');
        } catch {
            console.log('file1.txt отсутствует!');
        }

        try {
            await fs.access(second);
            console.log('data.json всё ещё существует!'); // Это не должно произойти
        } catch {
            console.log('data.json успешно удалён.');
        }

    } catch (err) {
        console.error('Произошла ошибка:', err);
    }
}

start()