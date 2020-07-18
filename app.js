/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Declare variables
var scores, roundScore, activePlayer, gamePlaying;


init();

// Roll Dice button logic
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // Generate random number on click
    var dice = Math.floor(Math.random() * 6) + 1;

    // Display the result
    var diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // Update the round score IF the rolled number was not a 1
    if (dice !== 1) {
      // Add score
      roundScore += dice
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // Add current score to global scores
    score[activePlayer] += roundScore;
    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = score[activePlayer]
    // Check if player won the game
    if (score[activePlayer] >= 20) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = "none";
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      // Indicate game has stopped
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

// Set to the next player
function nextPlayer() {
  // Make the next player active
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  // Reset CURRENT score to 0s
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'
  // Toggle active class to the new player
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  // Hide dice when the next player starts
  document.querySelector('.dice').style.display = "none";
}
// Initial conditions for the game to start
function init() {
  score = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  // Hide dice on load
  document.querySelector('.dice').style.display = "none";
  // Set ALL scores to 0
  document.getElementById('score-0').textContent = '0'
  document.getElementById('score-1').textContent = '0'
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'
  // Change winner back to player 1 or 2
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  // Remove winner class to change font color
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');
}
