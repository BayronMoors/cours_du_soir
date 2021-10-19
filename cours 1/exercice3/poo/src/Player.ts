import { IPlayer } from "./interface.js";

export class Player {
  private name: string;
  private point: number;

  public constructor(data: IPlayer) {
    this.name = data.name;
    this.point = data.point;
  }

  public getName = (): string => {
    return this.name;
  };

  public getPoint = (): number => {
    return this.point;
  };

  public changePoint = (point: number): void => {
    this.point += point;
  }

  public reset = (): void => {
    this.point = 0;
  }

  public throw = (): number => {
    return Math.ceil(Math.random() * 6);
  };

  public getContent = (): string => {
      return document.getElementById('player')!.innerText = `C'est le tour du joueur ${this.name}`;
  }

  public win = (): string => {
    return document.getElementById('player')!.innerText = `Le joueur ${this.name} a gagner!`;
  }
}
