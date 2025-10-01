class Animal {
    name: string;
    constructor (name: string) {
        this.name = name;
    } 
    makeSound(): void {}
}

export default class Dog extends Animal {
    makeSound(): void {
        console.log('Woof!');
    }
}
