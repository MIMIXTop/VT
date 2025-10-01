let pi : number = 3.14;

interface Shape {
    getArea(): number;
}

export class Circle implements Shape {
    radius: number;
    constructor (radius: number) {
        this.radius = radius;
    }

    getArea(): number {
        return pi * this.radius ** 2
    }
}

export class Rectangle implements Shape {
    width: number;
    height: number;


    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    getArea(): number {
        return this.width * this.height;
    }
}