export function reduceByCharacters(text = '', length = 22) {
  let output = '';
  for (let i = 0; i < text.length; i++) {
    if (i < length - 1) {
      output += text[i];
    }
  }
  return output + (text.length > length - 1 ? '...' : '');
}
