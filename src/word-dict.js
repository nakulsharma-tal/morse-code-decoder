const fs = require("fs");
const path = require("path");

function readDictionaryFromFile(filePath) {
  const dictionary = [];

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const words = fileContent.split("\n");

    for (const word of words) {
      if (word.trim() !== "") {
        dictionary.push(word.trim());
      }
    }
  } catch (err) {
    console.error(`Error reading file: ${err}`);
  }

  return dictionary;
}

const dictionaryFilePath = path.join(__dirname, "..", "data", "dict.txt");
const dictionary = readDictionaryFromFile(dictionaryFilePath);

console.log(`Dictionary loaded with ${dictionary.length} words.`);
// Dictionary loaded with 172823 words.

module.exports = { dictionary };
