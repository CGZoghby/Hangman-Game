// Ok, so the game goes in here. 
//I am using key event listens to listen for the players letters ---> look towards the rps-7 solved game and go from there
$(document).ready(function () {
  // Creating variables to hold the number of wins, letters already guessed, and number of guesses remaining. They start at 0.
  var wins = 0;
  var lettersAlreadyGuessed = []; //Begin as an empty array slowly populated with each character guessed
  var guessesRemaining = 12;  //the intent is to START at 12, and decrement each time the user is incorrect
  var alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  // Creating a gamePlay variable, that way key presses don't reset the computer guess, and the computer guess  
  // only resets if the word is completely guessed
  var gamePlay = 0;

  // Ideally I can create an array that is read from a file full of words from the computer to choose from.
  var computerChoices = ["lightsaber", "astromech", "wookiee", "ewok", "blaster", "sith", "youngling", "yoda", "dagobah", "luke", "leia", "tatooine", "padme", "han", "vader", "garbage"];

  // Made picking the word a function so all I have to do is call the function now every reset.
  function chooseWord() {
    return computerChoices[Math.floor(Math.random() * computerChoices.length)];
  }

  //Define the function that will insert the characters into the correct string
  //n is the index, c is the character being inserted, and originalString explains itself
  //I multiply by 2 because the displayString is "_ " so that the underscores display spaced and it looks more appealing aesthetically
  function alterAt(n, c, originalString) {
    return originalString.substr(0, 2 * n) + c + originalString.substr(2 * n + 1, 2 * originalString.length);
  }

  function guessLetter(letter, displayStr, answer) {

    //initialize variable for holding the value from indexOf function, then fill it with answer
    var checkIndex = 0;
    checkIndex = answer.indexOf(letter);

    //if the letter is inside the passed computerChoice string, then update the displayStr, and check again in case the letter is in there twice
    while (checkIndex >= 0) {
      displayStr = alterAt(checkIndex, letter, displayStr);
      checkIndex = answer.indexOf(letter, checkIndex + 1);
    }
    return displayStr;
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
      displayWord = tempStr;
      lettersAlreadyGuessed.push(userGuess);

    } else if (lettersAlreadyGuessed.indexOf(userGuess) > -1) {
      // do nothing

    } else if (alphabetArray.indexOf(userGuess) > -1) {
      lettersAlreadyGuessed.push(userGuess);
      guessesRemaining--;
    }

    if (guessesRemaining === 0) {
      reset();
    }

    // this method of display is totallly f*cking fine. What I need is to now trigger a display/img transition matching the correctly guessed word.
    if (displayWord.indexOf("_ ") === -1) {

      //initialize the variables that will be appended html elements
      var imageWin = $("<img>");
      var strWin = $("<h2>");
      //Actually really hype this works, it jsut means all the images are ideally saved as jpegs
      strWin.text("The word was " + computerChoice);
      //All images are found and saved from starwars.com/databank
      imageWin.attr("src", ("../Hangman-Game/assets/images/" + computerChoice + ".jpeg"));
      imageWin.addClass("img img-responsive")
      //Using jQuery here to empty the targeted containers each time and refresh them with the appropriate image/text
      $("#displayWinStr").empty();
      $("#results").empty();
      $("#displayWinStr").append(strWin);
      $("#results").append(imageWin);

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

  setTimeout(function () { $("#audio").pause() }, 37000);
  setTimeout(function () { $('#start').empty() }, 37000); //I need to empty the scrolling containers so that the game will display properly centered in the screen
  setTimeout(function () { $('#titles').empty() }, 37000);
  setTimeout(function () { $('#logo').empty() }, 37000);
  setTimeout(function () { $('.container').show() }, 37000);
});