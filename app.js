// app.js
const fs = require('fs');
const chalk = require('chalk');

/**
 * Reads and returns the content of 'declaration.txt'.
 * Make sure 'declaration.txt' is in the same directory as this file.
 */
function readFileContent() {
  return fs.readFileSync('declaration.txt', 'utf8');
}

/**
 * Returns an object mapping words (lowercased) to their frequency.
 * @param {string} content - The text content to analyze.
 * @returns {{ [word: string]: number }}
 */
function getWordCounts(content) {
  const wordCount = {};
  // Split on non-word characters, ignoring empty strings
  const words = content.split(/\W+/).filter(Boolean);

  for (let word of words) {
    word = word.toLowerCase();
    wordCount[word] = (wordCount[word] || 0) + 1;
  }
  return wordCount;
}

/**
 * Colors a word based on how frequently it appears.
 *  - freq = 1  => blue
 *  - freq = 2-5 => green
 *  - freq > 5  => red
 * @param {string} word - The original (case-sensitive) word to color.
 * @param {number} count - The word's frequency.
 * @returns {string} - The chalk-colored word.
 */
function colorWord(word, count) {
  if (count === 1) {
    return chalk.blue(word);
  } else if (count >= 2 && count <= 5) {
    return chalk.green(word);
  } else if (count > 5) {
    return chalk.red(word);
  }
  // If somehow count is 0 or not found, return as-is (unlikely if everything is in sync).
  return word;
}

/**
 * Prints the first 15 lines of the content with each word colored.
 * Adds a trailing space at the end of each line to match the test expectations.
 * @param {string} content - The text content to print.
 * @param {{ [word: string]: number }} wordCounts - The frequency map.
 */
function printColoredLines(content, wordCounts) {
  // Only print the first 15 lines (as an example)
  const lines = content.split('\n').slice(0, 15);

  for (const line of lines) {
    // Split line by non-word characters, ignoring empty entries.
    const wordsInLine = line.split(/\W+/).filter(Boolean);

    // Color each word based on frequency
    const colored = wordsInLine.map((originalWord) => {
      const lowerWord = originalWord.toLowerCase();
      const frequency = wordCounts[lowerWord] || 0;
      return colorWord(originalWord, frequency);
    });

    // Join with a space, then add a trailing space to match your test's exact output
    const outputLine = colored.join(' ') + ' ';
    console.log(outputLine);
  }
}

/**
 * Optionally, a "main" function if you run app.js directly:
 *  - Reads 'declaration.txt'
 *  - Gets word counts
 *  - Prints colored lines
 */
function processFile() {
  const content = readFileContent();
  const wordCounts = getWordCounts(content);
  printColoredLines(content, wordCounts);
}

/**
 * If this file is run directly (`node app.js`), execute processFile.
 */
if (require.main === module) {
  processFile();
}

// Export all the functions for testing
module.exports = {
  readFileContent,
  getWordCounts,
  colorWord,
  printColoredLines,
  processFile
};
