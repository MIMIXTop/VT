const express = require('express');

class ValidationException {
    constructor(message) {
        this.name = 'ValidationException'
        this.message = message;
        this.statusCode = 400
    }
}

class NotFoundException {
    constructor(message) {
        this.name = 'NotFoundException'
        this.message = message;
        this.statusCode = 404
    }
}

const app = express();
const port = 8080;

var itemsList = [
    {id: 1, name: 'Kolay', age: 20},
    {id: 2, name: 'Lexa', age: 17}
]

app.use(express.json());

app.use((req, res, next) => {
    const now = new Date;
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();

    const data = `Time: ${hour}:${min}:${sec} \nMethod: ${req.method} \nUrl: ${req.url} `;
    console.log(data);
    next();
});

function validDate(req, res, next) {
    const { body } = req;

    if(!body) {
        return next(new ValidationException('Тело запроса отсутствует'));
    }

    const errors = []

    if (req.method === 'POST') {
        if (!('name' in body)){
            errors.push('Поле "name" обязательно');
        } else if (typeof body.name !== 'string' || body.name.trim() === '' || typeof body.name === 'number') {
            errors.push('Поле "name" добжно быть не пустой строкой');
        }

        if (!('age' in body)){
            errors.push('Поле "age" обязательно');
        } else if (typeof body.age !== 'number' || body.age < 0) {
            errors.push('Поле "age" должно быть числом, которое больше нуля');
        }
    }

    if (req.method === 'PUT') {
        if ('name' in body){
            if (typeof body.name !== 'string' || body.name.trim() === '' || typeof body.name === 'number') {
                errors.push('Поле "name" добжно быть не пустой строкой');
            }
        }

        if ('age' in body){
            if (typeof body.age !== 'number' || body.age < 0) {
                errors.push('Поле "age" должно быть числом, которое больше нуля');
            }
        }
    }
   
    if (errors.length > 0) {
        return next(new ValidationException(errors.join('; ')));
    }

    next();
}

app.get('/items', (req, res) => {
    res.json(itemsList);
});

app.get('/items/:id', (req, res, next) => {
    const item = itemsList.find(i => i.id === parseInt(req.params.id));
    if(!item) {
        return next(new NotFoundException('Элемент не найден'));
    }
    res.json(item);
});

app.post('/items', validDate, (req, res) => {
    const newItem = {
        id: itemsList.length > 0 ? Math.max(...itemsList.map( i => i.id)) + 1 : 1,
        name: req.body.name,
        age: req.body.age
    };
    itemsList.push(newItem);
    res.status(201).json(newItem);
});

app.put('/items/:id', validDate, (req, res, next) => {
    const item = itemsList.find(i => i.id === parseInt(req.params.id));

    if (!item) {
        return next(new NotFoundException('Human not find'));
    }

    if (req.body.name !== undefined) {
        item.name = req.body.name;
    }
    
    if (req.body.age !== undefined) {
        item.age = req.body.age;
    }
    
    res.json(item);
});

app.delete('/items/:id', (req, res, next) => {
    const itemIndex = itemsList.findIndex(i => i.id === parseInt(req.params.id));

    if (itemIndex === -1) {
        return next(new NotFoundException('Human not find')) ;
    }
    const deleteItem = itemsList.splice(itemIndex, 1);
    res.json(deleteItem);
});

app.use((req, res, next) => {
    const error = new NotFoundException(`Маршрут ${req.method} ${req.url} не найден`);
    next(error);
});

app.use((err, req, res, next) => {
    console.error(err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Server failed'

    res.status(statusCode).json({
        error: message,
        statusCode: statusCode
    });
}); 

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});