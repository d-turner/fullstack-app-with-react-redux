// All the functions in the file should not mutate inputs and must return new objects
// TODO: Add exception for numbers
export function splitTextIntoArray(text) {
  // let prep = text.replace(/\./g, '.');
  // prep = prep.replace(/,/g, ' ,');
  // prep = prep.replace(/ +/g, ' ');
  let wordArray = text.split(' '); //.filter((e) => { return e === 0 || e; });
  // console.log(wordArray);
  /* */
  for (let i = 0; i < wordArray.length; i++) {
    if (i === wordArray.length - 1) break;
    if (
      (Number.isFinite(wordArray[i]) || (Number.isFinite(Number(wordArray[i])) && typeof wordArray[i] === 'string'))
      &&
      (Number.isFinite(wordArray[i + 1]) || (Number.isFinite(Number(wordArray[i + 1])) && typeof wordArray[i + 1] === 'string') ||
      wordArray[i + 1].endsWith('%'))
    ) {
      console.log('joining elements');
      const temp = joinElements(wordArray, '', i, i + 1);
      console.log(temp);
      const temp2 = wordArray.slice(0, i).concat(temp).concat(wordArray.slice(i + 2, wordArray.length));
      console.log(temp2);
      wordArray = temp2;
    }
    // if (!isNaN(wordArray[i]) && !isNaN(wordArray[i + 1]) && isNaN(wordArray[i])) {
    //   wordArray = joinElements(wordArray, '', i, i+1);
    // }
  }
  /* */
  return wordArray;
}

export function joinTextArray(array) {
  return array
    .join(' ')
    .replace(/`` {1,}/g, '"') // replace all '`` ' with '"'
    .replace(/ {1,}''/g, '"') // replace all  " ''" with '"'
    .replace(/[ ]{1,},/g, ',') // replace all ' ,' with ','
    .replace(/[ ]{1,}\./g, '.') // replace all ' .' with '.'
    .replace(/[ ]{1,}/g, ' ') // replace all '  ' with ' '
    .trim();
}

export function joinElements(array, seperator, start, end) {
  if (!start) start = 0;
  if (!end) end = this.length - 1;
  end++;
  return array.slice(start, end).join(seperator);
}

export function cleanText(text, lowercaseBefore) {
  let newText = (text === undefined || text === null) ? '' : text;
  if (lowercaseBefore) { newText = newText.toLowerCase(); }
  newText = newText.replace(/\r?\n|\r/g, '');
  newText = newText.replace(/\./g, '. ');
  newText = newText.replace(/,/g, ', ');
  newText = newText.replace(/ \./g, '.');
  newText = newText.replace(/ ,/g, ',');
  newText = newText.replace(/(<([^>]+)>)/ig, '');
  newText = newText.split('.').map(data => data.trim()).join('. ');
  newText = newText.replace(/ +/g, ' ');
  newText = newText.trim();
  return newText.toString().replace(/(^|\. *)([a-z])/g, (match, seperator, char) => {
    return seperator + char;
  });
}

export function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwnProperty(prop)) return false;
  }
  return true;
}

export function upperFirstLetter(string) {
  if (!string || string.length <= 0) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function upperLetterAt(string, index) {
  if (!string || string.length <= index || index < 0) return string;
  return string.charAt(index).toUpperCase() + string.slice(1);
}

export function lowerFirstLetter(string) {
  if (!string || string.length <= 0) return string;
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export function lowerLetterAt(string, index) {
  if (!string || string.length <= index || index < 0) return string;
  return string.slice(0, index) + string.charAt(index).toLowerCase() + string.slice(index + 1);
}

export function shouldUpperCase(string, index) {
  if (!string || string.length < index) return false;
  if (index === 0) return true;
  if (['.', '!', '?'].indexOf(string.charAt(index - 1)) + 1 ||
      ['.', '!', '?'].indexOf(string.charAt(index - 2)) + 1) return true;
  return false;
}

export function shouldInsertSpace(string, index) {
  if (index === 0) return true;
  if (string.charAt(index) === ' ' && string.charAt(index - 1) === ' ') return false;
  if ([' ', '.', '!', '?'].indexOf(string.charAt(index - 1)) + 1) return true; // add space before
  if ([' ', '.', '!', '?'].indexOf(string.charAt(index)) + 1) return true; // add space before
  return true;
}

export function shouldInsertBefore(string, index) {
  if (index === 0) return false;
  if (['.', '!', '?'].indexOf(string.charAt(index - 1)) + 1) return true; // add space before
  if ([' ', '.', '!', '?'].indexOf(string.charAt(index)) + 1) return true; // add space before
  return false;
}

export function shouldInsertAfter(string, index) {
  if (index === 0) return true;
  if ([' ', '.', '!', '?'].indexOf(string.charAt(index)) + 1) return false; // add space before
  if (string.charAt(index - 1) === ' ') return true;
  return false;
}

export function isCapital(char) {
  if (char === ' ') {
    // character is a space
    return false;
  } else if (!isNaN(char * 1)) {
    // character is numeric
    return false;
  }
  if (char === char.toUpperCase() && char !== char.toLowerCase()) {
    // character is upper case
    return true;
  } else if (char === char.toLowerCase() && char !== char.toUpperCase()) {
    // character is lower case
    return false;
  }
  // character is punctuation
  return false;
}

// returns the correct spacing for text in terms of sentence and cursorIndex
export function setSpacing(sentence, text, cursorIndex) {
  let newText = text;
  if (shouldUpperCase(sentence, cursorIndex)) {
    // modify the first letter of text
    newText = upperFirstLetter(text);
  } else {
    // TODO: Decide on if capital letters should go to lower case
    // newText = lowerFirstLetter(text);
  }
  if (shouldInsertSpace(sentence, cursorIndex)) {
    if (shouldInsertBefore(sentence, cursorIndex)) {
      newText = ` ${newText}`;
    } else if (shouldInsertAfter(sentence, cursorIndex)) {
      // insert space after
      newText = `${newText} `;
    } else {
      // case where there may already be a space before and after
    }
  }
  return newText;
}


// export function insertString(sentence, text, cursorIndex) {
//   const spaced = setSpacing(sentence, text, cursorIndex);
//   let formatted = sentence;
//   if (cursorIndex === 0) formatted = sentence.charAt(cursorIndex).toLowerCase() + sentence.slice(cursorIndex);
//   else if (isCapital(sentence.charAt(cursorIndex))) formatted = sentence.charAt(cursorIndex).toLowerCase() + sentence.slice(cursorIndex);
// }

export function getWordAt(sentence, position) {
  // Perform type conversions.
  const str = String(sentence);
  const pos = Number(position) >>> 0;

  // Search for the word's beginning and end.
  const left = str.slice(0, pos + 1).search(/\S+\s*/);
  const right = str.slice(pos).search(/\s/);

  // The last word in the string is a special case.
  if (right < 0) {
    return str.slice(left);
  }

  // Return the word, using the located bounds to extract it from the string.
  return str.slice(left, right + pos);
}

export const insertIntoArray = (array, index, values) => {
  return array.slice(0, index).concat(values).concat(array.slice(index));
};

export const insertAndReplace = (array, index, values) => {
  index = parseInt(index, 10);
  return array.slice(0, index).concat(values).concat(array.slice(index + 1));
};

export const removeIndex = (array, index) => {
  index = parseInt(index, 10);
  const part1 = array.slice(0, index);
  const part2 = array.slice(index + 1, array.length + 1);
  return part1.concat(part2);
};
