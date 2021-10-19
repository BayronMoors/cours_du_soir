declare const word: string[];
declare let currentWord: string;
declare let chronoStart: {
    minutes: number;
    seconds: number;
};
declare let chronoTotal: number;
declare let currentWordReplace: string;
declare let wrongLetter: string[];
declare const resetGame: () => void;
declare const checkError: (data: string[], input: HTMLInputElement) => void;
declare const checkLetter: (data: string) => void;
declare const checkWin: () => void;
