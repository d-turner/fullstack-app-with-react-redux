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
