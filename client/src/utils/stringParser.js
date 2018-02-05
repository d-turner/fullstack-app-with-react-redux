// All the functions in the file should not mutate inputs and must return new objects

export function splitTextIntoArray(text) {
  let prep = text.replace(/\./g, '.');
  // prep = prep.replace(/,/g, ' ,');
  prep = prep.replace(/ +/g, ' ');
  const wordArray = prep.split(' ').filter((e) => { return e === 0 || e; });
  // for (let i = 1; i < wordArray.length; i++) {
  //   if (!isNaN(wordArray[i - 1]) && !isNaN(wordArray[i + 1]) && isNaN(wordArray[i])) {
  //     wordArray[i - 1] = wordArray[i - 1] + wordArray[i] + wordArray[i + 1];
  //     wordArray[i] = '';
  //     wordArray[i + 1] = '';
  //   }
  // }
  return wordArray;
}

export function joinTextArray(array) {
  return array
    .join(' ')
    .replace(/[ ]{1,},/g, ',')
    .replace(/[ ]{1,}\./g, '.')
    .replace(/[ ]{1,}/g, ' ')
    .trim();
}

export function cleanText(text, lowercaseBefore) {
  let newText = (text === undefined || text === null) ? '' : text;
  if (lowercaseBefore) { newText = newText.toLowerCase(); }
  newText = newText.replace(/\r?\n|\r/g, '');
  newText = newText.replace(/\./g, '. ');
  newText = newText.replace(/,/g, ', ');
  newText = newText.replace(/ +/g, ' ');
  newText = newText.replace(/(<([^>]+)>)/ig, '');
  newText = newText.split('.').map(data => data.trim()).join('. ');
  newText = newText.trim();
  return newText.toString().replace(/(^|\. *)([a-z])/g, (match, separator, char) => {
    return separator + char;
  });
}

export function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwnProperty(prop)) return false;
  }
  return true;
}

export function upperFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function upperLetterAt(string, index) {
  return string.charAt(index).toUpperCase() + string.slice(1);
}

export function lowerFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export function lowerLetterAt(string, index) {
  return string.slice(0, index) + string.charAt(index).toLowerCase() + string.slice(index + 1);
}

export function shouldUpperCase(string, index) {
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