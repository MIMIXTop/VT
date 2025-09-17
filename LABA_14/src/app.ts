import Dog from "./animals";

import { Circle, Rectangle } from "./shapes";

let start : number = 10;
let start2 = 11;

let end : boolean = true;
let end2 = false;

let aftorName : string = "MIMIXTop";

let vec : number[] = [1,2,3,4,5];

let obj : {
    name: string;
    age : number;  
} = {
    name : "MIMIXTop",
    age : 15
}

function sendMessage(message : string , count : number) : number {
    //let age : number = "15";
    return 42;
}

function printInfo<T>(item : T) : void {
    console.log(item);
}

class DataStore<T> {
    vec : T[];
    constructor(vec : T[]) {
        this.vec = vec;
    }

    add(item : T) {
        this.vec.push(item);
    }

    getAll() : T[] {
        return this.vec;
    }
}

let dog : Dog = new Dog('Grisha');
let rec : Rectangle = new Rectangle(10, 4);

dog.makeSound();

console.log(rec.getArea());

let storyString = new DataStore<string>([aftorName, 'Lexa']);

storyString.add('Jon');

console.log(storyString.getAll());

let storyCircle = new DataStore<Circle>([new Circle(15)]);

storyCircle.add(new Circle(4));

console.log(storyCircle.getAll());