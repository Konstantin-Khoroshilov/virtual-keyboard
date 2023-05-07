function getKeyTextContent(lang, button, shiftIsPressed, capsIsOn) {
  if (lang === 'ru') {
    if (!button.hasRuLetter) {
      if (!shiftIsPressed) {
        return button.valueRu;
      }
      if (shiftIsPressed) {
        return button.shiftValueRu;
      }
    }
    if (button.hasRuLetter) {
      if (shiftIsPressed && capsIsOn) {
        return button.valueRu;
      }
      if (!shiftIsPressed && !capsIsOn) {
        return button.valueRu;
      }
      if (shiftIsPressed && !capsIsOn) {
        return button.shiftValueRu;
      }
      if (!shiftIsPressed && capsIsOn) {
        return button.shiftValueRu;
      }
    }
  }
  if (lang === 'en') {
    if (!button.hasEnLetter) {
      if (!shiftIsPressed) {
        return button.value;
      }
      if (shiftIsPressed) {
        return button.shiftValue;
      }
    }
    if (button.hasEnLetter) {
      if (shiftIsPressed && capsIsOn) {
        return button.value;
      }
      if (!shiftIsPressed && !capsIsOn) {
        return button.value;
      }
      if (shiftIsPressed && !capsIsOn) {
        return button.shiftValue;
      }
      if (!shiftIsPressed && capsIsOn) {
        return button.shiftValue;
      }
    }
  }
  return null;
}

export default getKeyTextContent;
