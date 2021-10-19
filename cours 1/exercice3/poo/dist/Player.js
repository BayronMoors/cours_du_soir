export class Player {
    constructor(data) {
        this.getName = () => {
            return this.name;
        };
        this.getPoint = () => {
            return this.point;
        };
        this.changePoint = (point) => {
            this.point += point;
        };
        this.reset = () => {
            this.point = 0;
        };
        this.throw = () => {
            return Math.ceil(Math.random() * 6);
        };
        this.getContent = () => {
            return document.getElementById('player').innerText = `C'est le tour du joueur ${this.name}`;
        };
        this.win = () => {
            return document.getElementById('player').innerText = `Le joueur ${this.name} a gagner!`;
        };
        this.name = data.name;
        this.point = data.point;
    }
}
