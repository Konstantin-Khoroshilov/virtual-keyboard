function getValueWNewChar(textArea, newChar) {
  return textArea.value.substring(0, textArea.selectionStart)
    + newChar
    + textArea.value.substring(textArea.selectionEnd, textArea.value.length);
}

export default getValueWNewChar;
