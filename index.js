// var player1="Player 1";
// var player2="Player 2";

// function roll(){
//     document.getElementById("roll").innerHTML = Math.floor(Math.random() * (6 - 1) + 1);
// }
// Get references to the necessary HTML elements
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const currentScore1 = document.querySelector('#current--0');
const currentScore2 = document.querySelector('#current--1');
const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initialize game variables
let scores, currentScore, activePlayer, playing;

// Reset the game
const resetGame = function() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  score1.textContent = 0;
  score2.textContent = 0;

  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');

  dice.classList.add('hidden');
}

// Roll the dice
const rollDice = function() {
  if (playing) {
    // Generate a random dice roll
    const diceRoll = Math.floor(Math.random() * 6) + 1;

    // Display the dice roll
    dice.src = `dice-${diceRoll}.png`;
    dice.classList.remove('hidden');

    // Update the current score
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
}

// Hold the current score
const holdScore = function() {
  if (playing) {
    // Add the current score to the player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

    // Check if the player has won
    if (scores[activePlayer] >= 100) {
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      dice.classList.add('hidden');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
}

// Switch to the next player
const switchPlayer = function() {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
}

// Reset the game on page load
resetGame();

// Roll the dice when the roll button is clicked
btnRoll.addEventListener('click', rollDice);

// Hold the current score when the hold button is clicked
btnHold.addEventListener('click', holdScore);

// Reset the game when the new game button is clicked
btnNew.addEventListener('click', resetGame);