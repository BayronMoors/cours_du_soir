const word = [
  "chemise",
  "as",
  "patron",
  "calme",
  "printemps",
  "angoisse",
  "habitant",
  "métier",
  "note",
  "fusil",
  "agent",
  "roman",
  "plante",
  "accent",
  "repas",
  "étendue",
  "corde",
  "saison"];
let currentWord: string;
let chronoStart: {minutes: number, seconds: number};
let chronoTotal: number;
let currentWordReplace: string;
let wrongLetter: string[];

const resetGame = () => {
  const h = document.querySelectorAll(
    "#hangm_guessbox, #hangm_guesses, #hangm_2, #hangm_1, #hangm_3, #hangm_4, #hangm_5, #hangm_6"
  );
  h.forEach((item) => {
    item.classList.add("h");
  });
  const inputValue = document.getElementById('guess')! as HTMLInputElement;
  inputValue.style.display = "inline";
  inputValue.value = "";
  document.getElementById('hangm_guesses')!.innerText = "";
}

const checkError = (data: string[], input: HTMLInputElement) => {
  if (data.length === 1){
    document.querySelector('.rope')!.classList.remove('h');
  }
  else if (data.length === 2){
  document.querySelector('.man_head')!.classList.remove('h');
  }
  else if (data.length === 3){
    document.querySelector('.man_upper')!.classList.remove('h');
  }
  else if (data.length === 4){
    document.querySelector('.man_lower')!.classList.remove('h');
    input.style.display = "none";
    document.getElementById('hangm_word')!.innerText = `${currentWord} \n Vous avez perdu!`;
  }
}

const checkLetter = (data: string) => {
  const index = currentWord.indexOf(data);
  const numberWord = index * 2;
  const newCurrentWord = currentWordReplace.split("");
  newCurrentWord[numberWord] = data;
  currentWordReplace = newCurrentWord.join('');
  document.getElementById('hangm_word')!.innerText = currentWordReplace;
}

const checkWin = () => {
  if (!currentWordReplace.includes('_')){
    const date = new Date();
    const sub = {
      minutes : date.getMinutes(),
      seconds: date.getSeconds()
    }
    const count = {
      minutes : sub.minutes - chronoStart.minutes,
      seconds: sub.seconds - chronoStart.seconds
    }
    chronoTotal = count.minutes + count.seconds;
    document.getElementById('guess')!.style.display = "none";
    document.getElementById('hangm_word')!.innerText = `${currentWord} \n Vous avez avez fais ${chronoTotal} secondes`;
  }
}
// onclick | start
document.getElementById('btn-start')!.addEventListener('click', () => {
  currentWord = word[Math.floor(Math.random() * word.length)];
  const now = new Date();
  resetGame();
  wrongLetter = [];
  chronoStart = {
    minutes: now.getMinutes(),
    seconds: now.getSeconds()
  };
  currentWordReplace = "";
  const h = document.querySelectorAll('#hangm_guessbox, #hangm_guesses, #hangm_2, #hangm_1');
  h.forEach(item => {
    item.classList.remove('h');
  })
  const regex = new RegExp('[a-z]');
  for (let i = currentWord.length; 0 < i ; i--) {
    currentWordReplace += '_ '
  }
  document.getElementById('hangm_word')!.innerText = currentWordReplace;
})



document.querySelector('form')!.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('guess')! as HTMLInputElement;
  const inputValue = input.value;
  input.onkeyup = (ev) => {
    if (ev.key === "Enter"){
      if (0 === inputValue.length || 2 <= inputValue.length){
        console.log('pas le bon nombre de lettre');
      }
      else{
        if (!wrongLetter.includes(inputValue)){
          if (!currentWord.includes(inputValue)){
            wrongLetter.push(inputValue);
            checkError(wrongLetter, input);
            document.getElementById('hangm_guesses')!.innerText = wrongLetter.join();
            input.value = "";
          }
          else{
            checkLetter(input.value);
            input.value = "";
            checkWin();
          }
        }
      }
    }
  }
})
