import { IPlayer } from "./interface.js";
export declare class Player {
    private name;
    private point;
    constructor(data: IPlayer);
    getName: () => string;
    getPoint: () => number;
    changePoint: (point: number) => void;
    reset: () => void;
    throw: () => number;
    getContent: () => string;
    win: () => string;
}
