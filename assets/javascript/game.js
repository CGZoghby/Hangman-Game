// Ok, so the game goes in here. 
//I am using key event listens to listen for the players letters ---> look towards the rps-7 solved game and go from there
    // Creates an array that is read from a file full of words from the computer to choose from.
    var computerChoices = [];

    // Creating variables to hold the number of wins, letters already guessed, and number of guesses remaining. They start at 0.
    var wins = 0;
    var lettersAlreadyGuessed = []; //Begin as an empty array slowly populated with each character guessed
    var guessesRemaining = 12;  //the intent is to START at 12, and decrement each time the user is incorrect

    // This function is run whenever the user presses a key.
    document.onkeyup = function(event) {

      // Determines which key was pressed.
      var userGuess = event.key;

      // Randomly chooses a choice from the options array. This is the Computer's guess.
      var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

      // Take the computer's guess and check to see if the character the user guessed belongs there
      // Something like, if (userGuess.indexof(computerGuess) > -1 ) {
      //                    stuff that makes the game fill in the correct character AND add that character to the list of letters already guessed
      //                    } else if (userGuess.indexof(lettersAlreadyGuessed) > -1) {
      //                        do nothing
      //                      } else if (user wins) {
      //                        update the wins score and automatically restart the game
      //                      } else { 
      //                            stuff that adds the character to the list of letters already guessed AND decrements number of guesses remaining          
      //                      }

        // Creating a variable to hold our new HTML. Our HTML now keeps track of the user and computer guesses, and wins/losses/ties.
        var html =
          "<p>wins: " + wins + "</p>" +
          "<p>Letters Already Guessed: " + lettersAlreadyGuessed + "</p>" +
          "<p>Number of Guesses Remaining: " + guessesRemaining + "</p>";

        // Set the inner HTML contents of the #game div to our html string
        document.querySelector("#game").innerHTML = html;
      
    };