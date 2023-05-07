function modifyTextArea(textAreaClassName, cursorShift, modifier, modifierArgs = []) {
  const textArea = document.querySelector(`.${textAreaClassName}`);
  const cursorPos = textArea.selectionStart;
  textArea.value = modifier(textArea, ...modifierArgs);
  textArea.focus();
  textArea.setSelectionRange(cursorPos + cursorShift, cursorPos + cursorShift);
}

export default modifyTextArea;
