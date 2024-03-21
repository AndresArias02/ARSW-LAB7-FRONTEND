export class Blueprint {

    name : string;
    author : string;
    amountOfPoints : number;
    points: { x: number, y: number }[];

    constructor() {
        this.name = '';
        this.author = '';
        this.points = [];
        this.amountOfPoints = this.points.length;
    }
}

