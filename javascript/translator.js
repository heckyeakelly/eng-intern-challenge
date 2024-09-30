// For Braille, each character is stored as a series of `O` (the letter O) or `.` (a period). Store Braille symbols as a 6 character string reading left to right, line by line, starting at the top left.

// - Braille Alphabet
const englishToBrailleDictionary = {
    //   - Letters `a` through `z`
    a: "O.....",
    b: "O.O...",
    c: "OO....",
    d: "OO.O..",
    e: "O..O..",
    f: "O.OO..",
    g: "O.OO..",
    h: "O..O..",
    i: ".O.O..",
    j: ".OO...",
    k: "O...O.",
    l: "O.O.O.",
    m: "OO..O.",
    n: "OO.OO.",
    o: "O..O..",
    p: "O.OO.O",
    q: "O.OO.O",
    r: "O..OO.",
    s: ".O.O.O",
    t: ".OO..O",
    u: "O...O.",
    v: "O.O.O.",
    w: ".O.O..",
    x: "OO..O.",
    y: "OO.OO.",
    z: "O..O..",
    // - Numbers `0` through `9`
    0: "O.OO.O",
    1: "O.....",
    2: "O.O...",
    3: "OO....",
    4: "OO.O..",
    5: "O..O..",
    6: "O.OO..",
    7: "O.OO..",
    8: "O..O..",
    9: ".O.O..",
    // - The ability to include `spaces` ie: multiple words
    space: "......",
    //   - When a Braille `capital follows` symbol is read, assume only the next symbol should be capitalized.
    capitalFollows: ".....O",
    //   - When a Braille `number follows` symbol is read, assume all following symbols are numbers until the next `space` symbol.
    numberFollows: ".O.OOO"
}

const brailleToEnglishDictionary = Object.fromEntries(
    Object.entries(englishToBrailleDictionary).map(([k, v]) => [v, k])
  );

// Given arguments passed into the program at runtime, determine if the given string should be translated to English or Braille.
function isBraille(input) {
    return input.match(/^[O.]+$/);
}

// The string to translate will be passed into your application as an argument at runtime. Your application must be smart enough to determine if the string given to it is either Braille or English and automatically convert it to the appropriate opposite. 

function englishToBraille(input) {
    let output = "";
    let numberMode = false;
  
    for (let char of input) {
      if (/[A-Z]/.test(char)) {
        if (numberMode) {
          output += englishToBrailleDictionary["capitalFollows"];
          numberMode = false;
        }
        output += englishToBrailleDictionary["capitalFollows"] + englishToBrailleDictionary[char.toLowerCase()];
      } else if (/[0-9]/.test(char)) {
        if (!numberMode) {
          output += englishToBrailleDictionary["numberFollows"];
          numberMode = true;
        }
        output += englishToBrailleDictionary[char];
      } else {
        if (numberMode) {
          numberMode = false;
        }
        output += englishToBrailleDictionary[char.toLowerCase()] || "";
      }
    }
    return output;
  }
  
  function brailleToEnglish(input) {
    let output = "";
    let i = 0;
    let capitalMode = false;
    let numberMode = false;
  
    while (i < input.length) {
      const brailleCell = input.slice(i, i + 6);
      if (brailleCell === brailleToEnglishDictionary["capitalFollows"]) {
        capitalMode = true;
      } else if (brailleCell === brailleToEnglishDictionary["numberFollows"]) {
        numberMode = true;
      } else {
        let char = brailleToEnglishDictionary[brailleCell] || "";
        if (capitalMode) {
          char = char.toUpperCase();
          capitalMode = false;
        } else if (numberMode) {
          char = "0123456789"["abcdefghij".indexOf(char)] || char;
        }
        output += char;
        if (char === " ") numberMode = false;
      }
      i += 6;
    }
    return output;
  }
  
  // After conversion, output the translated string--and nothing else--to the terminal. 
  function main() {
    const input = process.argv.slice(2).join(" ");
    if (isBraille(input)) {
      console.log(brailleToEnglish(input));
    } else {
      console.log(englishToBraille(input));
    }
  }
  
  main();
