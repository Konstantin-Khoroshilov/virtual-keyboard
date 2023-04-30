import './index.css';
import BUTTONS from './modules/BUTTONS';
import KEYCODES from './modules/KEYCODES';

if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'en');

const textArea = document.createElement('textarea');
textArea.className = 'textarea';
document.body.append(textArea);
const keyBoard = document.createElement('div');
keyBoard.className = 'keyboard';

Object.values(BUTTONS).forEach((button) => {
  const key = document.createElement('div');
  key.className = 'keyboard__key';
  if (button.isFunc) {
    key.classList.add('keyboard__key_func');
    key.textContent = button.name;
    key.id = button.name;
  } else {
    key.textContent = localStorage.getItem('lang') === 'en' ? button.value : button.valueRu;
    key.addEventListener('click', (e) => {
      e.target.classList.add('keyboard__key_active');
      const cursorPos = textArea.selectionStart;
      textArea.value = textArea.value.substring(0, textArea.selectionStart)
        + key.textContent
        + textArea.value.substring(textArea.selectionEnd, textArea.value.length);
      textArea.setSelectionRange(cursorPos + 1, cursorPos + 1);
    });
  }
  keyBoard.append(key);
});

document.body.append(keyBoard);
