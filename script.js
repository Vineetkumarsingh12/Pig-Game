'use strict';
// //way of selecting ID
// //1.using querySelector
// // 2.using getElementById-->faster
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const current1El = document.getElementById('current--1');
// console.log(current1El);

// intilizing the score initial

let scores, currentScore, activePlayer, playing;
const initialzing = function () {
  // adding hidden class in dice class

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--active');
  player0El.classList.add('player--active');
};
initialzing();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  currentScore = 0;

  // toggle add class if not present remove if not ther
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//Rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating a random dice roll
    const dice = Math.ceil(Math.random() * 6);
    console.log(dice);
    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check for rolled 1
    if (dice !== 1) {
      //add dice score ot current score
      currentScore += dice;
      console.log(dice);
      // select element dynamically
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player

      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 15) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initialzing);
//javascript call soon as possible
