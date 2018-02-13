// Ok, so the game goes in here. 
//I am using key event listens to listen for the players letters ---> look towards the rps-7 solved game and go from there

// Creating variables to hold the number of wins, letters already guessed, and number of guesses remaining. They start at 0.
var wins = 0;
var lettersAlreadyGuessed = []; //Begin as an empty array slowly populated with each character guessed
var guessesRemaining = 12;  //the intent is to START at 12, and decrement each time the user is incorrect

// Creating a gamePlay variable, that way key presses don't reset the computer guess, and the computer guess  
// only resets if the word is completely guessed
var gamePlay = 0;

// Ideally I can create an array that is read from a file full of words from the computer to choose from.
var computerChoices = ["lightsaber", "astromech", "wookie", "ewok", "blaster"];


function chooseWord() {
  return computerChoices[Math.floor(Math.random() * computerChoices.length)];
}

//Define the function that will insert the characters into the correct string
function alterAt(n, c, originalString) {
  return originalString.substr(0, 2 * n) + c + originalString.substr(2 * n + 1, 2 * originalString.length);
}

function guessLetter(letter, shown, answer) {
  var checkIndex = 0;

  checkIndex = answer.indexOf(letter);
  while (checkIndex >= 0) {
    shown = alterAt(checkIndex, letter, shown);
    checkIndex = answer.indexOf(letter, checkIndex + 1);
  }
  return shown;
}

function reset() {
  computerChoice = chooseWord();
  displayWord = "_ ".repeat(computerChoice.length);
  lettersAlreadyGuessed = [];
  guessesRemaining = 12;
}

var computerChoice = chooseWord();
var displayWord = "_ ".repeat(computerChoice.length);

// Tied to user keypresses, I need to display and fill in characters as things happen

// This function is run whenever the user presses a key.
document.onkeyup = function (event) {

  // Determines which key was pressed.
  var userGuess = event.key;

  // Take the computer's guess and check to see if the character the user guessed belongs there
  // Something like, 
  tempStr = guessLetter(userGuess, displayWord, computerChoice);

  winClause = displayWord.replace(/\s/g, '');

  if (tempStr !== displayWord) {
    // stuff that makes the game fill in the correct character AND 
    // add that character to the list of letters already guessed
    //displayWord = alterAt(computerChoice.indexOf(userGuess), userGuess, displayWord);
    displayWord = tempStr;
    lettersAlreadyGuessed.push(userGuess);

  } else if (lettersAlreadyGuessed.indexOf(userGuess) > -1) {
    // do nothing

  } else {
    lettersAlreadyGuessed.push(userGuess);
    guessesRemaining--;
  }

  if (winClause === computerChoice) {
    alert("You win!")
    wins++;
    reset()
    //update the wins score and automatically restart the game
  }

  // Creating a variable to hold our new HTML. Our HTML now keeps track of the user and computer guesses, and wins/losses/ties.
  var html =
    "<p>wins: " + wins + "</p>" +
    "<p>" + displayWord + "</p>" +
    "<p>Number of Guesses Remaining: " + guessesRemaining + "</p>" +
    "<p>Letters Already Guessed: " + lettersAlreadyGuessed + "</p>";

  // Set the inner HTML contents of the #game div to our html string
  document.querySelector("#game").innerHTML = html;

};