export function splitTextIntoArray(text) {
  let prep = text.replace(/\./g, ' .');
  prep = prep.replace(/,/g, ' ,');
  prep = prep.replace(/ +/g, ' ');
  const wordArray = prep.split(' ').filter((e) => { return e === 0 || e; });
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
