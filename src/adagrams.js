// Wanted to combine these into the following => {A: {value: 9, score: 1}}
// but ran into the following error during testing: "RangeError - Invalid array length"
const LETTER_DISTRIBUTION = {
  A: 9,
  B: 2,
  C: 2,
  D: 4,
  E: 12,
  F: 2,
  G: 3,
  H: 2,
  I: 9,
  J: 1,
  K: 1,
  L: 4,
  M: 2,
  N: 6,
  O: 8,
  P: 2,
  Q: 1,
  R: 6,
  S: 4,
  T: 6,
  U: 4,
  V: 2,
  W: 2,
  X: 1,
  Y: 2,
  Z: 1,
};
const LETTER_SCORES = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};

export const drawLetters = () => {
  const letterPool = [];
  const hand = [];

  // Create letter pool with correct letter distribution
  for (let [letter, count] of Object.entries(LETTER_DISTRIBUTION)) {
    do {
      letterPool.push(letter);
      count--;
    } while (count !=0);
  };
  
  // Randomly draw 10 letters for a hand
  for (let count = 10; count > 0; count--) {
    let randomIndex = Math.floor(Math.random() * letterPool.length);
    hand.push(letterPool[randomIndex]);
    letterPool.splice(randomIndex, 1);
  };

  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  let hasCorrectLetters = true;
  input.split('').forEach((letter) => {
    let index = lettersInHand.indexOf(letter);
    if (index !== -1) {
      lettersInHand.splice(index, 1);
    } else {
      hasCorrectLetters = false;
    }
  });
  return hasCorrectLetters;
};

export const scoreWord = (word) => {
  let score = 0;
  if (word.length === 0) {
    return 0;
  } else if (word.length >= 7) {
    score += 8;
  }
  word.toUpperCase().split('').forEach((letter) => {
    score += LETTER_SCORES[letter];
  })
  return score;
};

const calculateWinnerFromTie = (word1, word2) => {
  if (word1.length === word2.length) {
    return word1;
  } else if (word1.length === 10) {
    return word1;
  } else if (word2.length === 10) {
    return word2;
  }
  return word1.length < word2.length ? word1 : word2;
};

export const highestScoreFrom = (words) => {
  let winner = { word: '', score: 0 };
  words.forEach((word) => {
    let score = scoreWord(word);
    if (score > winner.score) {
      winner = { word, score };
    } else if (score === winner.score) {
      winner.word = calculateWinnerFromTie(winner.word, word);
    }
  })
  return winner;
};
