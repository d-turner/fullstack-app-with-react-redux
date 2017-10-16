export function splitTextIntoArray(text) {
  let prep = text.replace('.', ' .');
  prep = prep.replace(',', ' ,');
  prep = prep.replace('  ', ' ');
  const wordArray = prep.split(' ').filter((e) => { return e === 0 || e; });
  return wordArray;
}

export function joinTextArray(array) {
  return array
  .join(' ')
  .replace(' ,', ',')
  .replace(' .', '.')
  .replace(/ +/g, ' ')
  .trim();
}
