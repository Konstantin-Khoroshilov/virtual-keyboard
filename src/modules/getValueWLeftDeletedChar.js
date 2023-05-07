function getValueWLeftDeletedChar(textArea) {
  return textArea.value.substring(0, textArea.selectionStart - 1)
  + textArea.value.substring(textArea.selectionEnd, textArea.value.length);
}

export default getValueWLeftDeletedChar;
