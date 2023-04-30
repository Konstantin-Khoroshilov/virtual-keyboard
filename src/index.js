import './index.css';
import BUTTONS from './modules/BUTTONS';
import KEYCODES from './modules/KEYCODES';
import getValueWNewChar from './modules/getValueWNewChar';
import getValueWLeftDeletedChar from './modules/getValueWLeftDeletedChar';
import getValueWRightDeletedChar from './modules/getValueWRightDeletedChar';
import getKeyTextContent from './modules/getKeyTextContent';

const KEYBOARD_CLASS_NAME = 'keyboard';
const TEXTAREA_CLASS_NAME = 'textarea';
const KEY_CLASS_NAME = 'keyboard__key';
const FUNCTIONKEY_CLASS_NAME = 'keyboard__key_func';
const ACTIVEKEY_CLASS_NAME = 'keyboard__key_active';
let capsIsOn = false;
const shiftPressEvent = new Event('shift pressed', { bubbles: true });
const shiftUnpressEvent = new Event('shift unpressed', { bubbles: true });

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
    if (button.name === 'Del') {
      key.addEventListener('click', () => {
        const cursorPos = textArea.selectionStart;
        textArea.value = getValueWRightDeletedChar(textArea);
        textArea.focus();
        textArea.setSelectionRange(cursorPos, cursorPos);
      });
    }
    if (button.name === 'Shift') {
      key.addEventListener('mousedown', () => {
        const keys = Array.from(document.querySelectorAll(`.${KEY_CLASS_NAME}`));
        keys.forEach((currentKey) => {
          currentKey.dispatchEvent(shiftPressEvent);
        });
      });
      key.addEventListener('mouseup', () => {
        const keys = Array.from(document.querySelectorAll(`.${KEY_CLASS_NAME}`));
        keys.forEach((currentKey) => {
          currentKey.dispatchEvent(shiftUnpressEvent);
        });
      });
    }
  } else {
    key.textContent = localStorage.getItem('lang') === 'en' ? button.value : button.valueRu;
    key.addEventListener('click', () => {
      const cursorPos = textArea.selectionStart;
      textArea.value = getValueWNewChar(textArea, key.textContent);
      textArea.focus();
      textArea.setSelectionRange(cursorPos + 1, cursorPos + 1);
    });
    key.addEventListener('shift pressed', () => {
      const currentLang = localStorage.getItem('lang');
      key.textContent = getKeyTextContent(currentLang, button, true, capsIsOn);
    });
    key.addEventListener('shift unpressed', () => {
      const currentLang = localStorage.getItem('lang');
      key.textContent = getKeyTextContent(currentLang, button, false, capsIsOn);
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
