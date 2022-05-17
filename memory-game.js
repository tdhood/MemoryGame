"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);

let cardCounter = 0;
/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  console.log('createCards')
  const gameBoard = document.getElementById("game");
  
  let cardBack = document.createElement('img');
  cardBack.src = 'cardBack.jpg'

  for (let color of colors) {
    // missing code here ...
    let cardDiv = document.createElement('div');
    cardDiv.className = 'card cardBack'
    cardDiv.style.backgroundImage = cardBack;
    cardDiv.cardColor = color;
    
    cardDiv.addEventListener('click', handleCardClick);
    
    gameBoard.append(cardDiv)
  }
  return gameBoard;
  
}

/** Flip a card face-up. */

function flipCard(card) {
  console.log('flip')
  // ... you need to write this ...
  

  if(cardCounter < 2) {
    cardCounter += 1;
  }
  card.className = 'card';
  card.style.backgroundColor = card.cardColor;
  
  
  console.log('cardCounter', cardCounter)
  
}

/** Flip a card face-down. */

function unFlipCard(card) {
  console.log('unFlip')
  // ... you need to write this ...
  card.className = 'card cardBack';
  
}

/** Handle clicking on a card: this could be first-card or second-card. */
let cardOne;
let cardTwo;

function handleCardClick(evt) {
  console.log('handleCardClick', evt.currentTarget, evt)
  // ... you need to write this ...
  if(cardCounter === 0) {
    cardOne = evt.currentTarget;
  }
  if(cardCounter === 1) {
    cardTwo = evt.currentTarget;
  }

  if(cardCounter < 2){
  flipCard(evt.currentTarget)
  }
 
  if(cardCounter === 2 && cardOne.cardColor === cardTwo.cardColor) {
    cardCounter = 0;
    return;
  }
  console.log('cardCounter', cardCounter)

  if(cardCounter === 2) {
    cardCounter = 0;
    setTimeout(function() {
      unFlipCard(cardOne);
      unFlipCard(cardTwo);
    }, FOUND_MATCH_WAIT_MSECS)
  }
  
  console.log('cardCounter', cardCounter)
}
