function getValueWRightDeletedChar(textArea) {
  return textArea.value.substring(0, textArea.selectionStart)
  + textArea.value.substring(textArea.selectionEnd + 1, textArea.value.length);
}

export default getValueWRightDeletedChar;
