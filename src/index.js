import './index.css';
import BUTTONS from './modules/BUTTONS';
import KEYCODES from './modules/KEYCODES';
import getValueWNewChar from './modules/getValueWNewChar';
import getValueWLeftDeletedChar from './modules/getValueWLeftDeletedChar';

const KEYBOARD_CLASS_NAME = 'keyboard';
const TEXTAREA_CLASS_NAME = 'textarea';
const KEY_CLASS_NAME = 'keyboard__key';
const FUNCTIONKEY_CLASS_NAME = 'keyboard__key_func';
const ACTIVEKEY_CLASS_NAME = 'keyboard__key_active';

if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'en');

const textArea = document.createElement('textarea');
textArea.className = TEXTAREA_CLASS_NAME;
document.body.append(textArea);
const keyBoard = document.createElement('div');
keyBoard.className = KEYBOARD_CLASS_NAME;

Object.values(BUTTONS).forEach((button) => {
  const key = document.createElement('div');
  key.className = KEY_CLASS_NAME;
  if (button.isFunc) {
    key.classList.add(FUNCTIONKEY_CLASS_NAME);
    key.textContent = button.name;
    key.id = button.name;
    if (button.name === 'Enter') {
      key.addEventListener('click', () => {
        const cursorPos = textArea.selectionStart;
        textArea.value = getValueWNewChar(textArea, button.value);
        textArea.focus();
        textArea.setSelectionRange(cursorPos + 1, cursorPos + 1);
      });
    }
    if (button.name === 'Tab') {
      key.addEventListener('click', () => {
        const cursorPos = textArea.selectionStart;
        textArea.value = getValueWNewChar(textArea, button.value);
        textArea.focus();
        textArea.setSelectionRange(cursorPos + 4, cursorPos + 4);
      });
    }
    if (button.name === 'Backspace') {
      key.addEventListener('click', () => {
        const cursorPos = textArea.selectionStart;
        textArea.value = getValueWLeftDeletedChar(textArea);
        textArea.focus();
        textArea.setSelectionRange(cursorPos - 1, cursorPos - 1);
      });
    }
  } else {
    key.textContent = localStorage.getItem('lang') === 'en' ? button.value : button.valueRu;
    key.id = button.value;
    key.addEventListener('click', () => {
      const cursorPos = textArea.selectionStart;
      textArea.value = getValueWNewChar(textArea, key.textContent);
      textArea.focus();
      textArea.setSelectionRange(cursorPos + 1, cursorPos + 1);
    });
  }
  key.addEventListener('mousedown', (e) => {
    e.target.classList.add(ACTIVEKEY_CLASS_NAME);
  });
  key.addEventListener('mouseup', (e) => {
    e.target.classList.remove(ACTIVEKEY_CLASS_NAME);
  });
  keyBoard.append(key);
});

document.body.append(keyBoard);
