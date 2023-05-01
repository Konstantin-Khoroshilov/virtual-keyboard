import './index.css';
import {
  BUTTONS,
  KEYBOARD_CLASS_NAME,
  TEXTAREA_CLASS_NAME,
  KEY_CLASS_NAME,
  FUNCTIONKEY_CLASS_NAME,
  ACTIVEKEY_CLASS_NAME,
  NEW_CHAR_CURSOR_SHIFT,
  TAB_CURSOR_SHIFT,
  BSPACE_CURSOR_SHIFT,
  DEL_CURSOR_SHIFT,
  FIRST_STRING_START,
  FIRST_STRING_END,
  SECOND_STRING_START,
  SECOND_STRING_END,
  THIRD_STRING_START,
  THIRD_STRING_END,
  FOURTH_STRING_START,
  FOURTH_STRING_END,
} from './modules/CONSTANTS';
import getValueWNewChar from './modules/getValueWNewChar';
import getValueWLeftDeletedChar from './modules/getValueWLeftDeletedChar';
import getValueWRightDeletedChar from './modules/getValueWRightDeletedChar';
import getKeyTextContent from './modules/getKeyTextContent';
import modifyTextArea from './modules/modifyTextArea';
import dispatchEvent from './modules/dispatchEvent';

let capsIsOn = false;
let shiftIsPressed = false;
const keyboardChangeEvent = new Event('keyboard change request', { bubbles: true });

const handleKeyDown = (textAreaClassName, textArea, value) => {
  modifyTextArea(textAreaClassName, getValueWNewChar, [textArea, value], NEW_CHAR_CURSOR_SHIFT);
};
const handleTab = (textAreaClassName, textArea, value) => {
  modifyTextArea(textAreaClassName, getValueWNewChar, [textArea, value], TAB_CURSOR_SHIFT);
};
const handleBSpace = (textAreaClassName, textArea) => {
  modifyTextArea(textAreaClassName, getValueWLeftDeletedChar, [textArea], BSPACE_CURSOR_SHIFT);
};
const handleDel = (textAreaClassName, textArea) => {
  modifyTextArea(textAreaClassName, getValueWRightDeletedChar, [textArea], DEL_CURSOR_SHIFT);
};
const handleShiftDown = (keyClassName, event) => {
  shiftIsPressed = true;
  dispatchEvent(keyClassName, event);
};
const handleShiftUp = (keyClassName, event) => {
  shiftIsPressed = false;
  dispatchEvent(keyClassName, event);
};
const handleCapsDown = (key, activeClassName, keyClassName, event) => {
  if (!capsIsOn) {
    capsIsOn = true;
    key.classList.add(activeClassName);
  } else {
    capsIsOn = false;
    key.classList.remove(activeClassName);
  }
  dispatchEvent(keyClassName, event);
};

if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'en');

const textArea = document.createElement('textarea');
textArea.className = TEXTAREA_CLASS_NAME;
document.body.append(textArea);

const keyBoard = document.createElement('div');
keyBoard.className = KEYBOARD_CLASS_NAME;
const firstKeyBoardRow = document.createElement('div');
const secondKeyBoardRow = document.createElement('div');
const thirdKeyBoardRow = document.createElement('div');
const fourthKeyBoardRow = document.createElement('div');
const fifthKeyBoardRow = document.createElement('div');
Object.values(BUTTONS).forEach((button, buttonNumber) => {
  const key = document.createElement('div');
  key.className = KEY_CLASS_NAME;
  if (button.isFunc) {
    key.classList.add(FUNCTIONKEY_CLASS_NAME);
    key.textContent = button.name;
    if (button.name === 'Enter') {
      key.addEventListener('click', () => {
        handleKeyDown(TEXTAREA_CLASS_NAME, textArea, button.value);
      });
    }
    if (button.name === 'Tab') {
      key.addEventListener('click', () => {
        handleTab(TEXTAREA_CLASS_NAME, textArea, button.value);
      });
    }
    if (button.name === 'Backspace') {
      key.addEventListener('click', () => {
        handleBSpace(TEXTAREA_CLASS_NAME, textArea);
      });
    }
    if (button.name === 'Del') {
      key.addEventListener('click', () => {
        handleDel(TEXTAREA_CLASS_NAME, textArea);
      });
    }
    if (button.name === 'Shift') {
      key.addEventListener('mousedown', () => {
        handleShiftDown(KEY_CLASS_NAME, keyboardChangeEvent);
      });
      key.addEventListener('mouseup', () => {
        handleShiftUp(KEY_CLASS_NAME, keyboardChangeEvent);
      });
    }
    if (button.name === 'CapsLock') {
      key.addEventListener('click', (evt) => {
        handleCapsDown(evt.target, ACTIVEKEY_CLASS_NAME, KEY_CLASS_NAME, keyboardChangeEvent);
      });
    }
  } else {
    key.textContent = localStorage.getItem('lang') === 'en' ? button.value : button.valueRu;
    key.addEventListener('click', () => {
      handleKeyDown(TEXTAREA_CLASS_NAME, textArea, key.textContent);
    });
    key.addEventListener('keyboard change request', () => {
      const currentLang = localStorage.getItem('lang');
      key.textContent = getKeyTextContent(currentLang, button, shiftIsPressed, capsIsOn);
    });
  }
  key.addEventListener('mousedown', (e) => {
    e.target.classList.add(ACTIVEKEY_CLASS_NAME);
  });
  key.addEventListener('mouseup', (e) => {
    e.target.classList.remove(ACTIVEKEY_CLASS_NAME);
  });
  key.addEventListener('physKeyDown', (e) => {
    if (e.detail.code === button.code) {
      if (button.name !== 'CapsLock') {
        key.classList.add(ACTIVEKEY_CLASS_NAME);
      }
      if (button.name === 'Enter') {
        handleKeyDown(TEXTAREA_CLASS_NAME, textArea, button.value);
      } else if (button.name === 'Tab') {
        handleTab(TEXTAREA_CLASS_NAME, textArea, button.value);
      } else if (button.name === 'Backspace') {
        handleBSpace(TEXTAREA_CLASS_NAME, textArea);
      } else if (button.name === 'Del') {
        handleDel(TEXTAREA_CLASS_NAME, textArea);
      } else if (button.name === 'Shift') {
        handleShiftDown(KEY_CLASS_NAME, keyboardChangeEvent);
      } else if (button.name === 'CapsLock') {
        handleCapsDown(key, ACTIVEKEY_CLASS_NAME, KEY_CLASS_NAME, keyboardChangeEvent);
      } else if (!button.isFunc) {
        handleKeyDown(TEXTAREA_CLASS_NAME, textArea, key.textContent);
      }
    }
  });
  key.addEventListener('physKeyUp', (e) => {
    if (e.detail.code === button.code) {
      if (button.name !== 'CapsLock') {
        key.classList.remove(ACTIVEKEY_CLASS_NAME);
      }
      if (button.name === 'Shift') {
        handleShiftUp(KEY_CLASS_NAME, keyboardChangeEvent);
      }
    }
  });
  if (buttonNumber >= FIRST_STRING_START && buttonNumber < FIRST_STRING_END) {
    firstKeyBoardRow.append(key);
  } else if (buttonNumber >= SECOND_STRING_START && buttonNumber < SECOND_STRING_END) {
    secondKeyBoardRow.append(key);
  } else if (buttonNumber >= THIRD_STRING_START && buttonNumber < THIRD_STRING_END) {
    thirdKeyBoardRow.append(key);
  } else if (buttonNumber >= FOURTH_STRING_START && buttonNumber < FOURTH_STRING_END) {
    fourthKeyBoardRow.append(key);
  } else {
    fifthKeyBoardRow.append(key);
  }
  keyBoard.append(
    firstKeyBoardRow,
    secondKeyBoardRow,
    thirdKeyBoardRow,
    fourthKeyBoardRow,
    fifthKeyBoardRow,
  );
});
document.body.append(keyBoard);

const descriptionTexts = [
  'Клавиатура разработана для операционной системы Windows',
  'Для смены языка используйте сочетание клавиш: левые Ctrl + Alt',
];
for (let i = 0; i < descriptionTexts.length; i += 1) {
  const descriptionContainer = document.createElement('p');
  descriptionContainer.className = 'description';
  descriptionContainer.textContent = descriptionTexts[i];
  document.body.append(descriptionContainer);
}

window.addEventListener('keydown', (evt) => {
  evt.preventDefault();
  dispatchEvent(KEY_CLASS_NAME, new CustomEvent('physKeyDown', {
    detail: { code: evt.code },
  }));
  if (evt.altKey && evt.ctrlKey) {
    const lang = localStorage.getItem('lang');
    const newLang = lang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', newLang);
    dispatchEvent(KEY_CLASS_NAME, keyboardChangeEvent);
  }
});

window.addEventListener('keyup', (evt) => {
  evt.preventDefault();
  dispatchEvent(KEY_CLASS_NAME, new CustomEvent('physKeyUp', {
    detail: { code: evt.code },
  }));
});
