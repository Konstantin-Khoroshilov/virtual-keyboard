function modifyTextArea(textAreaClassName, modifier, modifierArgs, cursorShift) {
  const textArea = document.querySelector(`.${textAreaClassName}`);
  const cursorPos = textArea.selectionStart;
  textArea.value = modifier(...modifierArgs);
  textArea.focus();
  textArea.setSelectionRange(cursorPos + cursorShift, cursorPos + cursorShift);
}

export default modifyTextArea;
