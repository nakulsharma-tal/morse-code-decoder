const { charToMorseCodeDict } = require("./morse-code-dict");
const { dictionary } = require("./word-dict");

// Function to get all indexes of a value in an array
function getAllIndexes(arr, val) {
  var indexes = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i);
  }
  return indexes;
}

// Function to code word to morse code
function codeWord(word) {
  return word
    .trim()
    .split("")
    .map((char) => charToMorseCodeDict[char.toLowerCase()])
    .join("");
}

// Function to match words from the dictionary
function matchWords(morseCode, dictionary) {
  const codedWords = morseCode.split("/");
  const matchMap = new Map();

  codedWords.forEach((codedWord) => {
    matchMap.set(codedWord, []);
  });

  dictionary.forEach((d) => {
    const codedWord = codeWord(d);
    const indexes = getAllIndexes(codedWords, codedWord);
    indexes.forEach((index) => {
      matchMap.get(codedWords[index]).push(d);
    });
  });

  return matchMap;
}

// Example usage
const morseCode =
  "-...../..-.-..-..--.--./--.-..-....-..----./---..-./.-......-../-...../..--......-..-...../.--.-../....-..-.-.---......-.--./.....";

console.time("Total time to decode:");
const result = matchWords(morseCode, dictionary);
console.timeEnd("Total time to decode:");
// Total time to decode:: 72.02ms

console.log(result);
// Map(9) {
//   '-.....' => [
//     'bee',  'bee',  'bi',
//     'bi',   'die',  'die',
//     'tees', 'tees', 'the',
//     'the',  'tis',  'tis'
//   ],
//   '..-.-..-..--.--.' => [ 'ultimate' ],
//   '--.-..-....-..----.' => [ 'question' ],
//   '---..-.' => [ 'of' ],
//   '.-......-..' => [ 'levee', 'life' ],
//   '..--......-..-.....' => [ 'universe' ],
//   '.--.-..' => [ 'ace', 'akee', 'and', 'anti', 'wed' ],
//   '....-..-.-.---......-.--.' => [ 'everything' ],
//   '.....' => [ 'eh', 'he', 'is', 'see', 'si' ]
// }
